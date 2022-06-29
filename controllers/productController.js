const productService = require('../services/productService');

const productController = {
  async getList(_req, res) {
      const items = await productService.getList();
      if (!items) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(items);
  },
  
  async getById(req, res) {
    const { id } = await productService.validateParamsId(req.params);
    const item = await productService.getById(id);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(item);
  },

  async create(req, res) {
    const { name } = await productService.validateBody(req.body);
    const item = await productService.create(name);
    if (!item) return res.status(404).json({ message: 'Product not found' });
    return res.status(201).json({ id: item, name });
  },
};

module.exports = productController;