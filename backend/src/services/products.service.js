const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { message: 'NOT_FOUND' };
  return product;
};

const create = async (name) => {
  const product = await productsModel.create(name);
  const insertedId = { 
    id: product.insertId,
    name,
  };

  return insertedId;
};

module.exports = {
  findAll,
  findById,
  create,
};