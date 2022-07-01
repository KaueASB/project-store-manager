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
//   const fieldQuant = body.every(((item) => item.quantity));
//   const validQuant = body.every(((item) => item.quantity > 0));
//   if (!fieldId) return { code: 400, message: '"productId" is required' };
//   if (!fieldQuant) return { code: 400, message: '"quantity" is required' };
//   if (!validQuant) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
//   return true;
// };

// const exist = async (body) => {
//   const results = [];
//   const ids = body.forEach(async (item) => {
//     const cons = await productsModel.getById(item.productId);
//     console.log('cons', cons);
//     results.push(cons);
//     return false;
//   });
//   console.log('ids', ids);
//   console.log('results', results);
//   return true;
// };

const salesService = {  
  // async addSale(body) {
  //   const { code, message } = validateFields(body);
  //   if (message) return { code, message };
  //   // const items = await salesModel.addSale();
  //   return { code: 201, message: 'campos válidos' };
  // },

  async getList() {
    const items = await salesModel.getList();
    return items;
  },

  async getById(id) {
    const item = await salesModel.getById(id);
    return item;
  },
};

module.exports = salesService;