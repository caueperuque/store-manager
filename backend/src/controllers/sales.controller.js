const { salesService } = require('../services');

const findAll = async (_req, res) => {
  const sales = await salesService.findAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.findById(id);
  if (sale.message === 'NOT_FOUND') return res.status(404).json({ message: 'Sale not found' });
  
  res.status(200).json(sale);
};

const create = async (req, res) => {
  const { body } = req;
  const sale = await salesService.create(body);
  
  res.status(201).json(sale);
};

module.exports = {
  findAll,
  findById,
  create,
};

//