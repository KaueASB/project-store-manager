const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/:id', productController.getById);

productRoute.delete('/:id', (_req, _res) => { });

productRoute.put('/:id', (_req, _res) => { });

productRoute.post('/', (_req, _res) => { });

productRoute.get('/', productController.getList);

module.exports = productRoute;