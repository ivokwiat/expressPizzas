import config from '../../dbconfig.js';
import sql from 'mssql';
import IngredientesXPizzaService  from './ingredientesXPizza-services.js';

const IxPs = new IngredientesXPizzaService();

export default class UnidadService {
    getAll = async () => {
        let returnAll = null;
        console.log("Estoy en: unidadesService.getAll()")
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query('Select * FROM Unidades')
            returnAll = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnAll;
    }

    getByIdUnidad = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: unidadesService.GetById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Unidades WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];

            //returnEntity.Ingrediente = await IxPs.getByIdPizza(id);

        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    insert = async (unidad) => {
        let returnEntity = null;
        console.log('Estoy en: unidadesService.insert')
        console.log("NOMBRE: " + unidad.nombre)
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pNombre', sql.NChar, unidad.nombre)
            .query('INSERT INTO Unidades (Nombre) VALUES(@pNombre)');
            returnEntity = result.rowsAffected;
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    update = async (id, unidad) => {
        let updateReturn = null;
        console.log('Estoy en: unidadesService.update');
        console.log(unidad);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId', sql.Int, id)
            .input('pNombre', sql.NChar, unidad.nombre)
               .query('UPDATE Unidades set Nombre = @pNombre WHERE Id = @pId;');
            updateReturn = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return updateReturn;
    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: unidadesService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Unidades WHERE Id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}