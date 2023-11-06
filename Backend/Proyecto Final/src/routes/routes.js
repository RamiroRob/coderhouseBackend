const express = require('express');
const productsRouter = require('./products.routes')
const cartsRouter = require('./carts.routes')
const sessionsRouter = require('./sessions.routes')
const loggerRouter = require('./logger.routes')
const usersRouter = require('./users.routes')

const router = express.Router();

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)
router.use('/sessions', sessionsRouter)
router.use("/loggerTest", loggerRouter)
router.use("/users", usersRouter)


module.exports = router;