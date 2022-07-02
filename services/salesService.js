// const Joi = require('joi');
// const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

// const validateTypes = (body) => {
//   body.forEach((item, index) => {
//     const valuesObj = Object.values(item)[index];
//     if (typeof valuesObj === 'string') return false;
//     return true;
//   });
// };

// const validateFields = (body) => {
//   const fieldId = body.every(((item) => item.productId));
//   const fieldQuant = body.every(((item) => typeof item.quantity === 'number'));
//   const validQuant = body.every(((item) => item.quantity > 0));
//   if (!fieldId) return { code: 400, message: '"productId" is required' };
//   if (!fieldQuant) return { code: 400, message: '"quantity" is required' };
//   if (!validQuant) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
//   return true;
// };

const salesService = {
  async getList() {
    const items = await salesModel.getList();
    return items;
  },

  async getById(id) {
    const idExist = await salesModel.existId(id);
    const item = await salesModel.getById(id);
    if (item.length === 0 || !idExist) return { code: 404, message: 'Sale not found' };
    return item;
  },

  // async addSale(body) {
  //   if (Array.isArray(body)) {
  //     const { code, message } = validateFields(body);
  //     if (message) return { code, message };
  //   }
    
  //   const schema = Joi.object({
  //     productId: Joi.number().integer().required(),
  //     quantity: Joi.number().integer().required().min(1),
  //   });

  //   const result = await schema.validateAsync(body);
  //   console.log('result', result);

  //   if (!schema) return { code: 404, message: 'Product not found' };

  //   const newSale = await salesModel.addSale();
  //   return newSale;
  // },

  // async exist(body) {
  //   const results = [];
  //   await Promise.all(body.map(async (ele) => {
  //     const cons = await productsModel.getById(ele.productId);
  //     results.push(cons);
  //   }));
  //   // console.log('results', results);

  //   const idValid = results.every((each) => each);
  //   if (!idValid) return { code: 404, message: 'Product not found' };
  //   return true;
  // },
};

module.exports = salesService;