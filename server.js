// npm run server
import 'dotenv/config'
import express from "express";
import cors from "cors";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngredientesXPizzaRouter from "./src/controllers/ingredientesXPizzaController.js";
import UnidadesRouter from "./src/controllers/unidadesController.js";
import UsuariosRouter from "./src/controllers/usuariosController.js";
import UsuarioService from './src/services/usuarios-services.js';

//
// Variables/Constantes del Modulo
//
const app  = express();
const port = process.env.HTTP_PORT; // Puerto en donde levanta express (archivo .env)

/*
const horaMiddleware = function (req, res, next) {  
  let tiempo1 = new Date();
  console.log('Tiempo antes: ' + tiempo1.toISOString());  
  next(); 
  let tiempo2 = new Date();
  console.log('Tiempo después: ' + tiempo2.toISOString()); 
  console.log("Tiempo que tardó: " + (tiempo2 - tiempo1).toString() + " milisegundo/s");
} 
const checkTokenExpiration =function(req,res,next){
  if(req.path.toLowerCase().startsWith("/api/usuarios/login"))return next();
  let token=req.get("token")
  let usuario = UsuarioService.checkToken(token)
  console.log(usuario.TokenExpirationDate); 
  next()
  
  if (usuario.>Date.now) {
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
  res.set('Created', 'Luciano, Bautista&Guido');
  next();
}

app.use(horaMiddleware);
app.use(checkTokenExpiration)
//app.use(checkApiKey);
app.use(headerResponse);
*/
//
// Inclusion de los Middlewares
//
app.use(cors());                              // Agrego el middleware de CORS
app.use(express.json());                      // Agrego el middleware para parsear y comprender JSON
app.use('/front', express.static('public'));  // Agrego el middleware de retornar archivos estaticos, montando 
                                              //  en http://localhost:5000/front lo que existe en la carpeta "public"
// 
// Endpoints (todos los Routers)
//
app.use("/api/pizzas", PizzaRouter);
app.use("/api/ingredientesxpizzas", IngredientesXPizzaRouter);
app.use("/api/unidades", UnidadesRouter);
app.use("/api/usuarios", UsuariosRouter);
//
// Levanto el servidor WEB (pongo a escuchar)
//
app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/)`);
});
