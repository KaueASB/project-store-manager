const db = require('./db');

const productsModel = {
  async getList() {
    const [items] = await db.query('select * from StoreManager.products');
    return items;
  },

  async getById(id) {
    const sql = 'select * from StoreManager.products where id = ?';
    const [[item]] = await db.query(sql, [id]);
    return item;
  },

  async create(name) {
    const sql = 'insert into StoreManager.products (name) values (?)';
    const [{ insertId }] = await db.query(sql, [name]);
    return insertId;
  },
};

module.exports = productsModel;