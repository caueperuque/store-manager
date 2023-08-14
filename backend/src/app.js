const express = require('express');
const { productsModel } = require('./models');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const products = await productsModel.findAll();
  res.status(200).json(products);
});

module.exports = app;
