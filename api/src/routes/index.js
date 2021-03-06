const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./categories.js');
const userRouter = require('./user.js');
const orderRouter = require('./order.js')
const authRouter = require('./auth.js')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);

module.exports = router;