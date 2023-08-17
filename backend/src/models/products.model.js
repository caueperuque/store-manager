const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id=?',
    [productId],
  );
  return product;
};

const create = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );

  return result;
};

const update = async (productId, name) => {
  const [result] = await connection.execute(
    'UPDATE products SET name=? WHERE id=?',
    [name, productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};