const route = require('express').Router();
const { 
  validateProduct,
  validateUpdate,
  validateDelete,
} = require('../middlewares/products.middleware');

const { productsController } = require('../controllers');

route.put('/:id', validateUpdate, productsController.update);
route.get('/:id', productsController.findById);
route.delete('/:id', validateDelete, productsController.remove);
route.get('/', productsController.findAll);
route.post('/', validateProduct, productsController.create);

module.exports = route;