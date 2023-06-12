import config from './../../dbconfig.js';
import sql from 'mssql';
import logHelper from './../modules/log-helper.js';

class IngredientesService {
    getAllPizzas = async () => {
        let returnArray = null;
        
        try {
            let pool   = await sql.connect(config);
            let result = await pool.request().query("SELECT * FROM Pizzas");
            returnArray = result.recordset;
        }
        catch (error) {
            logHelper.logError('PizzaService->getAll', error);
        }
        return returnArray;
    }

    getByIdPizzas = async (id) => {
        let returnArray = null;
        let sqlText = "";
        let returnEntity = null;
        sqlText = ` SELECT 
                            ingredientesXPizza.Id AS Id,
                            Ingredientes.Id AS IdIngrediente,
                            Ingredientes.Nombre AS Nombre,
                            IngredientesXPizzas AS Cantidad,
                            Unidades.Id AS IdUnidad
                    FROM Ingredientes
                    INNER JOIN IngredientesXPizzas ON IngredientesXPizzas.IdIngrediente = Ingrediente.Id
                    INNER JOIN Unidades ON IngredientesXPizzas.IdUnidad = Unidades.Id
                    WHERE IngredientesXPizzas.IdPizza = @pId
                    `;




        incluirIngredientes = incluirIngredientes || false;
        //si viene por default


        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query(sqlText);
            returnEntity = result.recordsets;

        //si quiere incluir ingredientes
        } catch (error) {
            logHelper.logError('PizzaService->getById', error);
        }
        return returnEntity;
    }
    insert = async (pizza) => {
        let rowsAffected = 0;

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                .query(`INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            logHelper.logError('PizzaService->insert', error);
        }
        return rowsAffected;
    }

    update = async (id, pizza) => {
        let rowsAffected = 0;

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                .input('pId'         , sql.Int   , pizza?.Id ?? 0)
                .input('pOriginalId' , sql.Int   , id ?? 0)
                .query(`UPDATE Pizzas SET Nombre=@pNombre, LibreGluten=@pLibreGluten, Importe=@pImporte, Descripcion=@pDescripcion WHERE Id=@pOriginalId`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            logHelper.logError('PizzaService->update', error);
        }
        return rowsAffected;
    }

    deleteById = async (id) => {
        let rowsAffected = 0;

        try {
            let pool   = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', sql.Int, id)
                                .query('DELETE FROM Pizzas WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            logHelper.logError('PizzaService->deleteById', error);
        }
        return rowsAffected;
    }
}

export default IngredientesService;
