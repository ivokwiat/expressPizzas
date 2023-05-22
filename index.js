import config from './dbconfig.js';
import sql from 'mssql';
import express from 'express'
import PizzaService from './src/services/pizzas-services.js';
import cors from "cors";

const app= express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));


app.get('api/pizzas/', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.getAll();
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.get('api/pizzas/:id', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.getById(req.params.id);
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.delete('api/pizzas/:id', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.deleteById(req.params.id);
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.put('api/pizzas/:id', async (req,res) => {
    let svc = new PizzaService();
    let pizza = req.body;
    console.log("estoy en el update");
    let respuesta = await svc.update(pizza);
    res.send(respuesta);
    // res.send(respuesta);
})

app.post('api/pizzas/', async (req,res) => {
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
