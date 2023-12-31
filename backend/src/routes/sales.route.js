const route = require('express').Router();

const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/sales.middlewares');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', validateSale, salesController.create);

module.exports = route;