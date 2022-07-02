const salesService = require('../services/salesService');

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

  // async addSale(req, res) {
  //   const { code, message } = await salesService.addSale(req.body);
  //   if (message) return res.status(code).json({ message });
  //   return res.sendStatus(201);
  // },
};

module.exports = salesController;
