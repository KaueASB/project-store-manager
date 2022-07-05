const productsModel = require('../models/productsModel');
const productsService = require('./productsService');
const salesModel = require('../models/salesModel');

const salesService = {
  async getList() {
    const items = await salesModel.getList();
    return items;
  },

  async getById(id) {
    const idExist = await salesModel.existId(id);
    const item = await salesModel.getById(id);
    if (!idExist || item.length === 0) return { code: 404, message: 'Sale not found' };
    return item;
  },

  validateBody(body) {
    const fieldId = body.some(((item) => item.productId));
    const fieldQuant = body.some(((item) => typeof item.quantity === 'number'));
    const validQuant = body.some(((item) => item.quantity > 0));
    if (!fieldId) return { code: 400, message: '"productId" is required' };
    if (!fieldQuant) return { code: 400, message: '"quantity" is required' };
    if (!validQuant) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
    return true;
  },

  async existIdProd(body) {
    const results = [];
    await Promise.all(body.map(async (ele) => {
      const prod = await productsModel.getById(ele.productId);
      return results.push(prod);
    }));

    const idsValid = results.every((each) => each);
    if (!idsValid) return false;
    return true;
  },

  async addSale(body) {
    const { code, message } = this.validateBody(body);
    if (message) return { code, message };
    
    const idExist = await this.existIdProd(body);
    if (!idExist) return { code: 404, message: 'Product not found' };

    const newSaleId = await salesModel.addSale();

    const itemsSold = await Promise.all(body.map(({ productId, quantity }) => salesModel
      .addProd(newSaleId, productId, quantity)));
    return { newSold: { id: newSaleId, itemsSold } };
  },

  async remove(id) {
    const removeProduct = await salesModel.remove(id);
    return removeProduct;
  },

  async update(body, paramsId) {
    const { id } = await productsService.validateParamsId(paramsId);

    const { code, message } = this.validateBody(body);
    if (message) return { code, message };

    const prodExist = await this.existIdProd(body);
    if (!prodExist) return { code: 404, message: 'Product not found' };

    const saleExist = await salesModel.getById(id);
    if (saleExist.length === 0) return { code: 404, message: 'Sale not found' };

    const itemsUpdated = await Promise.all(body.map(({ productId, quantity }) => salesModel
      .update(id, productId, quantity)));
    return { updateItem: { saleId: id, itemsUpdated } };
  },
};

module.exports = salesService;