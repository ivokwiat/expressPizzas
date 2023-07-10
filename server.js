import 'dotenv/config'
import express from "express";
import cors from "cors";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngredientesXPizzaRouter from "./src/controllers/ingredientesXPizzaController.js";
import UnidadesRouter from "./src/controllers/unidadesController.js";
import UsuariosRouter from "./src/controllers/usuariosController.js";
import UsuarioService from './src/services/usuarios-services.js';
const app  = express();
const port = 5000;
let svcUsuario=new UsuarioService

const horaMiddleware = function (req, res, next) {  
  let tiempo1 = new Date();
  console.log('Tiempo antes: ' + tiempo1.toISOString());  
  next(); 
  let tiempo2 = new Date();
  console.log('Tiempo después: ' + tiempo2.toISOString()); 
  console.log("Tiempo que tardó: " + (tiempo2 - tiempo1).toString() + " milisegundo/s");
} 
const checkTokenExpiration = async function(req,res,next){
  if(req.path.toLowerCase().startsWith("/api/usuarios/login"))return next();
  let token=req.get("token")
  console.log(token);
  let tiempoAhora= new Date()
  let usuario =   await svcUsuario.getByToken(token)
  console.log(usuario);
  console.log(usuario.TokenExpirationDate);
  console.log("Tiempo expiracion:"+ usuario.TokenExpirationDate); 
  console.log("Tiempo ahora:"+tiempoAhora);
  if (usuario.TokenExpirationDate>=tiempoAhora) {
    //console.log(usuario.TokenExpirationDate);
    //console.log(tiempoAhora);
    next()
  }
  else{
    res.status(401).send('NO está autorizado, TOKEN expirado');
  }
    

  
}

const checkApiKey = function  (req, res, next){
  if(req.path.toLowerCase().startsWith("/front/"))return next();
  if(req.path.toLowerCase().startsWith("/api/usuarios"))return next();
  if(req.path.toLowerCase().startsWith("/api/ingredientesxpizzas"))return next();
  if(req.path.toLowerCase().startsWith("/api/ingredientes"))return next();
  if(req.path.toLowerCase().startsWith("/api/unidades"))return next();
  if(req.headers.apikey != undefined && req.headers.apikey != null && req.headers.apikey == "123456789"){
      next();
  }else{
      res.status(401).send('NO está autorizado, necesita una ApiKey valida');
  }
}



const headerResponse = function (req, res, next){
  res.set('Created', 'Ivan, Santiago');
  next();
}

app.use(horaMiddleware);
app.use(checkTokenExpiration)
//app.use(checkApiKey);
app.use(headerResponse);

app.use(cors());
app.use(express.json());
app.use('/front', express.static('public'));

//endpoint de los routers

app.use("/api/pizzas", PizzaRouter);
app.use("/api/ingredientesxpizzas", IngredientesXPizzaRouter);
app.use("/api/unidades", UnidadesRouter);
app.use("/api/usuarios", UsuariosRouter);

app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/)`);
});
