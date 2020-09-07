const server = require('express').Router();
const Sequelize = require("sequelize");
const { Order , Product, Inter_Prod_Order } = require('../db.js');

///////////////////////////////////////////GET

server.get('/:idOrder', (req,res,next) => {
    Order.findOne({
        where: {
            idOrder: req.params.idOrder,
        },
        include: [{
            model: Product,
            as: 'products',
        }]
     }).then((order) => {
         res.send(order)
        }).catch(next);
})

server.get('/search', (req,res,next) => {
    Order.findAll({
        where : {
            status: { [Sequelize.Op.like]: "%" + req.query.query + "%" }
        }
    }).then((orders) => {
        res.send(orders)
    }).catch(next);
})
server.get('/',(req,res,next) => {
    Order.findAll().then(orders => {
        res.send(orders)
    }).catch(next)
})

/////////////////////////////////////////POST

server.post('/', (req,res,next) => {
    const { idUser, idProduct } = req.body;
    Order.create({
        idUser,
        idProduct,
    }).then((order) => {
        res.send(order);
    }).catch(next)
});

///////////////////////////////////////////////////////////////////////////PUT




/////////////////////////////////DEV


server.post('/aaa', (req, res, next) => {
<<<<<<< HEAD
	Order.create({
        idOrder: 1,
		idUser: 1,
        idProduct: 1,
	}).then(()=> {
        return Inter_Prod_Order.create({
=======
	Inter_Prod_Order.create({
>>>>>>> c6eb399929e887acc0db8302994425bc161a14d1
            idProduct: 1,
            idOrder: 1,
            price: 2222.0,
            quantity: 3
<<<<<<< HEAD
        })
    }).then(()=> {
        return Inter_Prod_Order.create({
            idProduct: 2,
            idOrder: 1,
            price: 22.0,
            quantity: 5
        })
    }).then((order) => {
        res.send(order)
    }).catch(next);
})
=======
        }).then(()=> {
            return Inter_Prod_Order.create({
                idProduct: 2,
                idOrder: 1,
                price: 22.0,
                quantity: 5
            })
        }).then((order) => {
            res.send(order)
        }).catch(next);
    })
>>>>>>> c6eb399929e887acc0db8302994425bc161a14d1

module.exports = server;