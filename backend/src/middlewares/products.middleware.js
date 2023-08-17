const { productsModel } = require('../models');

const checkProductExists = async (productId) => {
  const product = await productsModel.findById(productId);
  return !!product;
};

const validateUpdate = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  const productExists = await checkProductExists(id);
  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validateProduct = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = {
  validateProduct,
  validateUpdate,
  checkProductExists,
};