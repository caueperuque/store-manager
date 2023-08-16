const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `
    SELECT s.id AS saleId, s.date, sproducts.product_id AS productId, sproducts.quantity 
    FROM sales s 
    JOIN sales_products sproducts ON s.id = sproducts.sale_id;
    `,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sales] = await connection.execute(
    `
    SELECT s.date, sproducts.product_id AS productId, sproducts.quantity 
    FROM sales s 
    JOIN sales_products sproducts ON s.id = sproducts.sale_id 
    WHERE s.id = ?
    `,
    [id],
  );
  
  return sales;
};

const create = async (saleData) => {
  const [sale] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date()],
  );

  const inseredId = sale.insertId;

  const salesProducts = saleData.map(({ productId, quantity }) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [inseredId, productId, quantity],
    ));
  
  console.log(salesProducts, sale);
  return [sale, salesProducts];
};

module.exports = {
  findAll,
  findById,
  create,
};