const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/:id', salesController.getById);

salesRoute.delete('/:id', salesController.remove);

// salesRoute.put('/:id', salesController.update, (_req, _res) => { });

salesRoute.post('/', salesController.addSale);

salesRoute.get('/', salesController.getList);

module.exports = salesRoute;