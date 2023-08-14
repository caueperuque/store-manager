const data = '2023-08-14T22:57:41.000Z';

const allSalesFromModel = [
  {
    saleId: 1,
    date: data,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: data,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: data,
    productId: 3,
    quantity: 15,
  },
];

const allSalesFromDB = [
  [{
    saleId: 1,
    date: data,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: data,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: data,
    productId: 3,
    quantity: 15,
  }],
  null,
];

module.exports = {
  allSalesFromDB,
  allSalesFromModel,
};