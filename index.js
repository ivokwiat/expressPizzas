
import express from 'express'
import PizzaService from './src/services/pizzas-services.js';
import cors from "cors";

const app= express();
const port = 5000;
const svc = new PizzaService();


app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));


app.get('/api/pizzas/', async (req,res) => {
 
    const pizzas = await svc.getAll();
    let respuesta;
    if (pizzas!=null){
        respuesta = res.status(200).json(pizzas);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
    
      return respuesta;

})

app.get('/api/pizzas/:id', async (req,res) => {
    let respuesta;
    let id = req.params.id;
  
    const pizza = await svc.getById(id);
  
    if (pizza!=null){
      respuesta = res.status(200).json(pizza);
    } else {
      respuesta = res.status(404).send(`No se encontro la Pizza (id:${id}).`);
    }
  
    return respuesta;
  })

app.delete('/api/pizzas/:id', async (req,res) => {

    let retorno;
    let respuesta = await svc.deleteById(req.params.id);
    if (respuesta!=0){
        retorno = res.status(200).json(retorno);
      } else {
        retorno = res.status(404).send(`No se encontro la Pizza (id:${req.params.id}).`);
      }
      return retorno;
})


app.put('/api/pizzas/:id', async (req,res) => {
    let id    = req.params.id;
    let pizza = req.body;
    const respuesta = await svc.update(id, pizza);
    return res.status(200).json(respuesta);

})
  
app.post('/api/pizzas/', async (req,res) => {
    let pizza = req.body;
    const respuesta = await svc.insert(pizza);
    return res.status(201).json(respuesta);
    // res.send(respuesta);
})



app.listen(port, () => {
    console.log(`"index" escuchando el en el puerto ${port} (http://localhost:${port}/)`);
  });