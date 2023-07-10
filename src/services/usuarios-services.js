import config from '../../dbconfig.js';
import sql from 'mssql';

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
    loginUsuario = async (username)=>{
        let returnEntity = null
        console.log('Estoy en: usuariosService.loginUsuario(username)');
        try{
            let pool =await sql.connect(config)
            let result = await pool.request()
            .input('pUsername',sql.VarChar,username)
            .query('SELECT * FROM USUARIOS where Username = @pUsername')
            returnEntity = result.recordsets[0][0];
        
    } catch (error) {
        console.log(error);
    }
    return returnEntity;
    }
    updateToken=async(token,expirationTime,Id)=>{
        let updateReturn = null;
        console.log('Estoy en: usuariosService.updateToken');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
               .input('pToken', sql.VarChar, token)
               .input('pExpirationDate', sql.DateTime, expirationTime)
               .input('pId',sql.Int,Id)
               .query('UPDATE USUARIOS set Token = @pToken, TokenExpirationDate = @pExpirationDate where Id=@pId');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }
    getByToken=async(token)=>{
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