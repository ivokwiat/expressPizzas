import config from './dbconfig.js';
import sql from 'mssql';
import express from 'express'
import PizzaService from './src/services/pizzas-services.js';

const app= express();
const port = 3000;

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

app.put('/:id', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.update(req.params.id);
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.post('/:id', (req,res) => {
    let svc = new PizzaService();
    let respuesta = svc.insert(req.params.id);
    respuesta.then(listaPizzas => {res.send(listaPizzas)})
    // res.send(respuesta);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
