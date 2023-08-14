const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) return { message: 'NOT_FOUND' };
  return sale;
};

module.exports = {
  findAll,
  findById,
};