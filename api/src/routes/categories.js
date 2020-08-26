
const server = require('express').Router();
const { Categories } = require('../db.js');
const Product = require('../models/Product.js');
const Inter_Cat_Prod = require('../models/Inter_Cat_Prod.js');

//Creo una categoria
server.post('/:id/:name/:description/:products',(req,res,next) => {
    const {idCategory,name, description} = req.body;
    Categories.create({
        idCategory,
        name,
        description,    
    }).then(res.send(req.body))
    .catch(next);
})

//Borro una categoria

server.delete('/products/category/:id', (req, res, next) => {
	Inter_Cat_Prod.destroy({
		where: {
			idCategorie: req.body.idCategory
		}
	}).then(res.send(req.body))
		.catch(next)


})
//Actualizo datos de la categoria
server.put('/products/category/:id', (req,res,next) => {
    Categories.findOne({where: {id:req.params.id}}).then(category => {
        category.update({...category,
            name: req.body.name,
            description: req.body.description
        }).then(res.send(req.body))
    }).catch(next);
})


module.exports = server;