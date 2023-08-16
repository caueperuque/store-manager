const route = require('express').Router();
const { validateProduct } = require('../middlewares/products.middleware');

const { productsController } = require('../controllers');

route.get('/', productsController.findAll);
route.get('/:id', productsController.findById);
route.post('/', validateProduct, productsController.create);

module.exports = route;