const Joi = require('joi');
const productModel = require('../models/productModel');

const productService = {
  async getList() {
    const items = await productModel.getList();
    return items;
  },

  async validateParamsId(id) {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    });
    const result = await schema.validateAsync(id);
    return result;
  },

  async getById(id) {
    const item = await productModel.getById(id);
    return item;
  },

};

module.exports = productService;