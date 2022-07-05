const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  async getList(_req, res) {
    const items = await salesService.getList();
    if (!items) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(items);
  },
  
  async getById(req, res) {
    const item = await salesService.getById(req.params.id);
    const { code, message } = item;
    if (message) return res.status(code).json({ message });
    return res.status(200).json(item);
  },

  async addSale(req, res) {
    const { code, message, sold } = await salesService.addSale(req.body);
    if (message) return res.status(code).json({ message });

    return res.status(201).json(sold);
  },

  async remove(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    const isValidId = await salesService.getById(id);
    if (!isValidId) return res.status(404).json({ message: 'Sale not found' });

    const removeItem = await salesService.remove(id);
    if (!removeItem) return res.status(404).json({ message: 'Sale not found' });

    return res.sendStatus(204);
  },
};

module.exports = salesController;
