const productModel = require('../models/products.model');

const checkProductExists = async (productId) => {
  const product = await productModel.findById(productId);
  return !!product;
};

const validateSale = async (req, res, next) => {
  const { body } = req;

  if (body.some((item) => item.productId === undefined)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (body.some((item) => item.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (body.some((item) => item.quantity < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const productIds = body.map((item) => item.productId);
  const productExists = await Promise.all(productIds.map(checkProductExists));

  if (productExists.includes(false)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateSale,
};