import { Router} from 'express';
import UnidadService from '../services/unidades-services.js';
import { ReasonPhrases, StatusCodes} from 'http-status-codes';

const router = Router();
const unidadService = new UnidadService();

router.get('', async (req, res) => {
  let respuesta;
  const unidades = await unidadService.getAll();
  if (unidades!=null){
    respuesta = res.status(StatusCodes.OK).json(unidades);
  } else {
    respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`Error interno.`);
  }

  return respuesta;
});

router.get('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const unidad = await unidadService.getByIdUnidad(id);

  if (unidad!=null){
    respuesta = res.status(StatusCodes.OK).json(unidad);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Unidad (id:${id}).`);
  }

  return respuesta;
});

router.post('/', async (req, res) => {
  let unidad = req.body;

  const registrosAfectados = await unidadService.insert(unidad);
  
  return res.status(StatusCodes.CREATED).json(registrosAfectados);
});

router.put('/:id', async (req, res) => {
  let id    = req.params.id;
  let unidad = req.body;

  const registrosAfectados = await unidadService.update(id, unidad);

  return res.status(StatusCodes.OK).json(registrosAfectados);
});

router.delete('/:id', async (req, res) => {
  let respuesta;
  let id = req.params.id;

  const registrosAfectados = await unidadService.deleteById(id);
  if (registrosAfectados!=0){
    respuesta = res.status(StatusCodes.OK).json(respuesta);
  } else {
    respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontro la Unidad (id:${id}).`);
  }
  return respuesta;
});

export default router;