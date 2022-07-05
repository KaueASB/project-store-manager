const db = require('./db');

const salesModel = {
  async getList() {
    const sql = `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id`;
    const [items] = await db.query(sql);
    return items;
  },

  async existId(id) {
    const sql = 'SELECT 1 FROM StoreManager.sales_products WHERE sale_id = ?';
    const [items] = await db.query(sql, [id]);
    return items;
  },

  async getById(id) {
    const sql = `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`;
    const [item] = await db.query(sql, [id]);
    return item;
  },
  
  async addSale() {
    const sql = 'insert into StoreManager.sales (date) values (now())';
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },

  async addProd(saleId, productId, quantity) {
    const sql = `insert into StoreManager.sales_products
    (sale_id, product_id, quantity) values (?, ?, ?)`;
    await db.query(sql, [saleId, productId, quantity]);
    return { productId, quantity };
  },

  async remove(id) {
    const sql = 'delete from StoreManager.sales where id = ?';
    const [{ affectedRows }] = await db.query(sql, [id]);
    return affectedRows;
  },
};

module.exports = salesModel;