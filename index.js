import config from './dbconfig.js';
import sql from 'mssql';
import express from 'express'
import PizzaService from './src/services/pizzas-services.js';
import cors from "cors";

const app= express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.getAll();
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.get('/:id', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.getById(req.params.id);
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.delete('/:id', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.deleteById(req.params.id);
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.put('/:id', async (req,res) => {
    let svc = new PizzaService();
    let pizza = req.body;
    console.log("estoy en el update");
    let respuesta = await svc.update(pizza);
    res.send(respuesta);
    // res.send(respuesta);
})

app.post('/', async (req,res) => {
    let svc = new PizzaService();
    let pizza = req.body;
    console.log(pizza);
    let respuesta = await svc.insert(pizza);
    res.send(respuesta);
    // res.send(respuesta);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
