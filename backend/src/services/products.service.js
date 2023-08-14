const { productsModel } = require('../models');

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) return { message: 'Product Not Found' };
  return product;
};

module.exports = {
  findById,
};