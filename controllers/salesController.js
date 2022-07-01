const salesService = require('../services/salesService');

const salesController = {
  // async addSale(req, res) {
  //   const { code, message } = await salesService.addSale(req.body);
  //   // if (message) return res.status(404).json({ message: 'Product not found' });
  //   return res.status(code).json({ message });
  // },
  async getList(_req, res) {
    const items = await salesService.getList();
    if (!items) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(items);
  },

  async getById(req, res) {
    const item = await salesService.getById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(item);
  },
};

module.exports = salesController;
