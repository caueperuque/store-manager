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

const create = async (productId, quantity) => {
  // pegar o id da sale e o id do produto e inserir na tabela sales_products
  // sales product vou ter q rodar um loop pra inserir cada produto
  // sales vou inserir apenas uma vez
  // sales_products vou inserir a quantidade de produtos que eu tenho
  const [salesP] = await connection.execute(
    `
    INSERT INTO sales_products (product_id, quantity) VALUES (?, ?);
    `,
    [productId, quantity],
  );
  const [sales] = await connection.execute(
    `
    INSERT INTO sales (product_id, quantity) VALUES (?, ?);
    `,
    [productId, quantity],
    );
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
    const promises = sales.map(({ productId, }))
  return [salesP, sales];
};


module.exports = {
  findAll,
  findById,
};