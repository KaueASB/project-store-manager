const Joi = require('joi');
const productsModel = require('../models/productsModel');

const productsService = {
  async getList() {
    const items = await productsModel.getList();
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
    const item = await productsModel.getById(id);
    return item;
  },

  async validateBody(body) {
    const schema = Joi.object({
      name: Joi.string().required().min(5),
    });
    const result = await schema.validateAsync(body);
    return result;
  },

  async create(name) {
    const addProduct = await productsModel.create(name);
    return addProduct;
  },

};

module.exports = productsService;