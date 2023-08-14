const express = require('express');
const { productsModel } = require('./models');
const { productsService } = require('./services');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const products = await productsModel.findAll();
  res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await productsService.findById(id);
  res.status(200).json(serviceResponse);
});

module.exports = app;
