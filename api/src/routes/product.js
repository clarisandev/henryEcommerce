const server = require('express').Router();
const Sequelize = require("sequelize");
const { Product, Categories, Inter_Cat_Prod } = require('../db.js');


/////////////////////////////////////////////////////////////////////////////////////////////// GETS
server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => { res.send(products); }).catch(next);
});

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/categoria/:nombreCat', (req, res, next) => {
	Categories.findOne({
		where: {
			name: req.params.nombreCat
		},
		include: [{ model: Product, as: 'products' }]
	}).then(category => {
		res.send(category.products)
	}).catch(next)
})

// GET /search?query={valor}
// Retorna todos los productos que tengan {valor} en su nombre o descripcion.
server.get('/search', (req, res, next) => {
	Product.findAll({
		where: {
			[Sequelize.Op.or]: [{
				name: {
					[Sequelize.Op.like]: "%" + req.query.query + "%"
				}
			},
			{
				description: {
					[Sequelize.Op.like]: "%" + req.query.query + "%"
				}
			}]
		}
	}).then(products => { res.send(products) })
})



/////////////////////////////////////////////////////////////////////////////////////////////// POSTS
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
		}).then(() => {
			Categories.create({
				name: "Perros",
				description: "la recontra descripcion"
			})
		})
	}).then(() => {
		Product.create({
			name: "Perro",
			description: "Hace afuera",
			precio: 10,
			rating: 5,
			stock: 10,
		})
			.then(() => {
				Inter_Cat_Prod.create({
					idCategory: 2,
					idProduct: 1
				}).then(() => {
					Inter_Cat_Prod.create({
						idCategory: 2,
						idProduct: 3
					})
				})
			})
			.catch(next)
	})
})

server.post('/crear', (req, res, next) => {
	const { name, description, precio, rating, stock } = req.body;
	Product.create({
		name,
		description,
		precio,
		rating,
		stock,
	}).then(res.send(req.body))
		.catch(next);
});

server.post('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.create({
		idCategory: req.body.idCategory,
		idProduct: req.body.idProduct
	}).then(res.send(req.body)).catch(next)
})

server.post('/category', (req, res, next) => {
	const { name, description } = req.body;
	Categories.create({
		name,
		description
	}).then(res.send(req.body))
		.catch(next);
})




/////////////////////////////////////////////////////////////////////////////////////////////// DELETE
server.delete('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.destroy({
		where: {
			idProduct: req.body.idProduct,
			idCategory: req.body.idCategory
		}
	}).then(res.send(req.body))
		.catch(next)
})




module.exports = server;
