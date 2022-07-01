const db = require('./db');

const salesModel = {
  // async addSale() {
  //   const sql = 'insert into StoreManager.sales (date) values (now())';
  //   const [{ insertId }] = await db.query(sql);
  //   return insertId;
  // },

  async getList() {
    const [items] = await db.query('select * from StoreManager.sales');
    return items;
  },

  async getById(id) {
    const [[item]] = await db.query('select * from StoreManager.sales where id = ?', [id]);
    console.log(item);
    return item;
  },
};

module.exports = salesModel;