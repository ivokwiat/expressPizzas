import { Router} from 'express';
import PizzaService from '../services/pizzas-services.js';
import IngredientesXPizzaService from '../services/IngredientesXPizza-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router = Router();
const pizzaService = new PizzaService();
const ingredientesXPizzaService = new IngredientesXPizzaService();

router.get('/', async (req, res) => {
  let respuesta;

  const pizzas = await pizzaService.getAll();
  if (pizzas!=null){
    console.log(pizzas);
    let ingre = ingredientesXPizzaService.getAllPizzas();
    //let ingre = [{id: 1, nombre : 'cebolla'}, {id: 2, nombre : 'tmarte'}];
    pizzas.ingredientes = ingre;
    respuesta = res.status(StatusCodes.OK).json(pizzas);

    respuesta = res.status(StatusCodes.OK).json(pizzas);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const pizza = await pizzaService.getById(id);

  if (pizza!=null){
    console.log(pizza);
    let ingre = ingredientesXPizzaService.getByIdPizzas(id);
    //let ingre = [{id: 1, nombre : 'cebolla'}, {id: 2, nombre : 'tmarte'}];
    pizza.ingredientes = ingre;
    respuesta = res.status(StatusCodes.OK).json(pizza);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Pizza (id:${id}).`);
  }

  return respuesta;
});

router.post('', async (req, res) => {
  let pizza = req.body;

  const registrosAfectados = await pizzaService.insert(req.body);

  return res.status(StatusCodes.CREATED).json(registrosAfectados);
});

router.put('/:id', async (req, res) => {
  let id    = req.params.id;
  let pizza = req.body;

  const registrosAfectados = await pizzaService.update(id, pizza);

  return res.status(StatusCodes.OK).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const registrosAfectados = await pizzaService.deleteById(id);
  if (registrosAfectados!=0){
    respuesta = res.status(StatusCodes.OK).json(respuesta);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Pizza (id:${id}).`);
  }
  return respuesta;
});

export default router;
