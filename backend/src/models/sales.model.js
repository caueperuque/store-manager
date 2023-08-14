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

module.exports = {
  findAll,
  findById,
};