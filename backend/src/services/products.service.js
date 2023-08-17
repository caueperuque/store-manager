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

const update = async (productId, name) => {
  await productsModel.update(productId, name);
  const insertedId = {
    id: Number(productId),
    name,
  };
  return insertedId;
};

const remove = async (productId) => {
  const product = await productsModel.remove(productId);
  return product;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};