const productsService = require('../services/productsService');

const productsController = {
  async getList(_req, res) {
      const items = await productsService.getList();
      if (!items) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(items);
  },
  
  async getById(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    const item = await productsService.getById(id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(item);
  },

  async create(req, res) {
    const { name } = await productsService.validateBody(req.body);
    const item = await productsService.create(name);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    return res.status(201).json({ id: item, name });
  },
};

module.exports = productsController;