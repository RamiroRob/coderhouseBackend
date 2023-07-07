const express = require('express');
const data = require('../data.json');

const products = data.products

const viewsRouter = express.Router()


viewsRouter.get('/', (req, res) => {
    res.render('home', {
        products,
        style: 'styles.css'
    })
})

viewsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        products,
        style: 'styles.css'
    })
})

module.exports = viewsRouter;