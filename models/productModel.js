const db = require('./db');

const productModel = {
  async getList() {
    const [items] = await db.query('select * from StoreManager.products');
    return items;
  },

  async getById(id) {
    const [[item]] = await db.query('select * from StoreManager.products where id = ?', [id]);
    return item;
  },
};

module.exports = productModel;