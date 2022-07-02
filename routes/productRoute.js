const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productRoute = Router();

productRoute.get('/:id', productsController.getById);

productRoute.delete('/:id', productsController.remove);

productRoute.put('/:id', productsController.update);

productRoute.post('/', productsController.create);

productRoute.get('/', productsController.getList);

module.exports = productRoute;