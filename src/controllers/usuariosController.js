import { Router} from 'express';
import UsuarioService from '../services/usuarios-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';
import crypto from 'crypto';
const router = Router();
const usuarioService = new UsuarioService();

const crearToken= function(){
  let uuid = crypto.randomUUID()
  return  uuid
}

const tiempoExpiracion = function(){
  const creacionToken = new Date();
  const expiracionToken = new Date(creacionToken.getTime() + (1 * 60 * 1000));
  return expiracionToken;
}

router.get('', async (req, res) => {
  let respuesta;
  const usuarios = await usuarioService.getAll();
  if (usuarios!=null){
    respuesta = res.status(StatusCodes.OK).json(usuarios);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/buscar/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const usuario = await usuarioService.getByIdUsuario(id);

  if (usuario!=null){
    respuesta = res.status(StatusCodes.OK).json(usuario);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro el usuario (id:${id}).`);
  }

  return respuesta;
});
router.post('/login',async(req,res)=>{
    let respuesta
    let username =req.body.UserName
    let password=req.body.PassWord
    console.log(username);
    let usuario= await usuarioService.loginUsuario(username)
    let usuario2
    if (usuario.PassWord==password && usuario!=null){
      if (usuario.token==null){
        let token=crearToken()
        let expiracionToken=tiempoExpiracion()
          usuario2=await usuarioService.updateToken(token,expiracionToken,usuario.Id)
      }else{
        if (usuario.TokenExpirationDate>=Date.now){
          let token=crearToken()
          let expiracionToken=tiempoExpiracion()
            usuario2=await usuarioService.updateToken(token,expiracionToken,usuario.Id)
        }
      }
      usuario= await usuarioService.loginUsuario(username)
      respuesta = res.status(StatusCodes.OK).json(usuario);
      
    }
    
     else {
      respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro el usuario (nombre:${username}).`);
    }
})



export default router;