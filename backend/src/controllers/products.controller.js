const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const serviceResponse = await productsService.findAll();

  res.status(200).json(serviceResponse);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const serviceResponse = await productsService.findById(id);

  if (serviceResponse.message === 'NOT_FOUND') {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(serviceResponse);
};

const create = async (req, res) => {
  const { name } = req.body;

  const serviceResponse = await productsService.create(name);
  console.log(serviceResponse, 'oi');

  res.status(201).json(serviceResponse);
};

module.exports = {
  findAll,
  findById,
  create,
};