const express = require('express');
const data = require('../data.json');

const products = data.products

const viewsRouter = express.Router()


viewsRouter.get('/', (req, res) => {
    res.render('home', {products})
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {products})
})

module.exports = viewsRouter;