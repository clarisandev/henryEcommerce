const server = require('express').Router();
const { Product, Categories, Inter_Cat_Prod } = require('../db.js');


server.post('/aaa', (req, res, next) => {
    Product.create({
		
        name: "Dragon",
        description: "Escupe Fuego",
        precio: 10,
        rating: 5,
        stock: 10,
    }).then(() => {
        Categories.create({
            name: "animales",
            description: "Todo tipo de animales"
        })
    }).then(() => {
        Categories.create({
            name: "Objetos",
            description: "Todo tipo de objetos"
        })
    }).then(() => {
        Product.create({
            name: "Perro",
            description: "Hace afuera",
            precio: 10,
            rating: 5,
            stock: 10,
        })/* .then(() => {
            Inter_Cat_Prod.create({
                idCategorie: 2,
                idProduct: 1
            })
        }) */.catch(next)
    })
})


server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
/*POST /products/:idProducto/category/:idCategoria

Agrega la categoria al producto.



DELETE /products/:idProducto/category/:idCategoria

Elimina la categoria al producto.

*/
/* server.post('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.create({
		idCategorie: req.body.idCategorie,
		idProduct: req.body.idProduct
	}).then(res.send(req.body))
})
 */

server.delete('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.destroy({
		where: {
			idProduct: req.body.idProduct,
			idCategory: req.body.idCategory
		}
	}).then(res.send(req.body))
		.catch(next)

})






//Product.findAll({
/* 	where : {
		categorias : req.params
	}
})
 */

module.exports = server;
