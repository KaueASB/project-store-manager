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

  async create(name) {
    const sql = 'insert into StoreManager.products (name) values (?)';
    const [addProduct] = await db.query(sql, [name]);
    const { insertId } = addProduct;
    return insertId;
  },
};

module.exports = productModel;