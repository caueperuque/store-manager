const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    'SELECT * FROM sales INNER JOIN sales_products ON sales.id = sales_products.sale_id;',
  );
  return sales;
};

const findById = async (id) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );
  return sale;
};

module.exports = {
  findAll,
  findById,
};