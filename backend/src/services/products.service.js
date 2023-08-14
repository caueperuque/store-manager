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

module.exports = {
  findAll,
  findById,
};