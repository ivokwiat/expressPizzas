import { Router} from 'express';
import IngredientesXPizzaService from '../services/ingredientesXPizza-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router = Router();
const ingredientesXPizzaService = new IngredientesXPizzaService();

router.get('', async (req, res) => {
  let respuesta;
  const ingredientesXPizza = await ingredientesXPizzaService.getAll();
  if (ingredientesXPizza!=null){
    respuesta = res.status(StatusCodes.OK).json(ingredientesXPizza);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const ingredientesXPizza = await ingredientesXPizzaService.getById(id);

  if (ingredientesXPizza!=null){
    respuesta = res.status(StatusCodes.OK).json(ingredientesXPizza);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro el ingredientePorPizza (id:${id}).`);
  }

  return respuesta;
});

router.post('', async (req, res) => {
  let ingredientesXPizza = req.body;

  const registrosAfectados = await ingredientesXPizzaService.insert(ingredientesXPizza);

  return res.status(StatusCodes.CREATED).json(registrosAfectados);
});

router.put('/:id', async (req, res) => {
  let id = req.params.id;
  let ingredientesXPizza = req.body;

  const registrosAfectados = await ingredientesXPizzaService.update(id, ingredientesXPizza);

  return res.status(StatusCodes.OK).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const registrosAfectados = await ingredientesXPizzaService.deleteById(id);
  if (registrosAfectados!=0){
    respuesta = res.status(StatusCodes.OK).json(respuesta);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro el Ingrediente por Pizza (id:${id}).`);
  }
  return respuesta;
});

export default router;