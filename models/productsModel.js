const db = require('./db');

const productsModel = {
  async getList() {
    const [items] = await db.query('select * from StoreManager.products');
    return items;
  },

  async getById(id) {
    const sql = 'select * from StoreManager.products where id = ?';
    const [[item]] = await db.query(sql, [id]);
    console.log(item);
    return item;
  },

  async create(name) {
    const sql = 'insert into StoreManager.products (name) values (?)';
    const [{ insertId }] = await db.query(sql, [name]);
    return insertId;
  },

  async update(name, id) {
    const sql = 'update StoreManager.products set name = ? where id = ?';
    const [{ affectedRows }] = await db.query(sql, [name, id]);
    return affectedRows;
  },

  async remove(id) {
    const sql = 'delete from StoreManager.products where id = ?';
    const [{ affectedRows }] = await db.query(sql, [id]);
    return affectedRows;
  },
};

module.exports = productsModel;