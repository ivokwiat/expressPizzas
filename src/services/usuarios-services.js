import config from '../../dbconfig.js';
import sql from 'mssql';

/*import IngredientesXPizzaService  from './ingredientesXPizza-services.js';

const IxPs = new IngredientesXPizzaService();*/

export default class UsuarioService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: usuariosService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Usuarios')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getByIdUsuario = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: usuariosService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Usuarios WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];

            //returnEntity.Ingrediente = await IxPs.getByIdPizza(id);

        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    getByUserNamePassword  = async (entidad) => {
        let returnEntity = null;
        console.log('Estoy en: usuariosService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pUserName', sql.VarChar, entidad.UserName)
                                    .input('pPassword', sql.VarChar, entidad.Password)
                                    .query('SELECT * FROM Usuarios WHERE UserName = @pUserName AND Password = @pPassword');
            returnEntity = result.recordsets[0][0];

            //returnEntity.Ingrediente = await IxPs.getByIdPizza(id);

        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }



    loginUsuario = async (username)=>{
        let usuario = this.getByUserNamePassword (username);
        if (usuario!= null){
            let token = self.crypto.randomUUID();;
            let TokenExpirationDate = new Date();
            TokenExpirationDate.setMinutes(TokenExpirationDate.getMinutes() + 15);
            this.updateToken(token, TokenExpirationDate)
            // El usuario SI existe
        }else{

            // El usuario no existe
        }
        return usuario;
    }




    updateToken=async(token,TokenExpirationDate)=>{
        let updateReturn = null;
        console.log('Estoy en: usuariosService.updateToken');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
               .input('pToken', sql.VarChar, token)
               .input('pExpirationDate', sql.DateTime, TokenExpirationDate)
               .query('UPDATE USUARIOS set Token = @pToken, TokenExpirationDate = @pExpirationDate where Token=@pToken');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }
    checkToken=async(token)=>{
        let returnEntity=null
        try{
            let pool =await sql.connect(config)
            let result = await pool.request()
            .input('pToken',sql.VarChar,token)
            .query('SELECT * FROM USUARIOS where Token = @pToken')
            returnEntity = result.recordsets[0][0];
        
    } catch (error) {
        console.log(error);
    }
    return returnEntity;
    }
    

  
}