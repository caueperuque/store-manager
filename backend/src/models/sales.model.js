const camelize = require('camelize');
const connection = require('./connection');
const { getFormattedColumnNames, getFormattedPlaceholders } = require('./utils/formattedQuery');

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

const create = async (sales) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO sales (date) VALUE (?);', [new Date()]);
  const insertSalesProducts = sales.map(async (sale) => {
    const placeholders = getFormattedPlaceholders(sale);
    const columns = getFormattedColumnNames(sale);
    const query = await connection.execute(
      `INSERT INTO sales_products (sale_id, ${columns}) VALUES (?, ${placeholders})`,
      [insertId, ...Object.values(sale)],
      );
    return query;
  });
  await Promise.all(insertSalesProducts);
  return insertId;
};

module.exports = {
  findAll,
  findById,
  create,
};