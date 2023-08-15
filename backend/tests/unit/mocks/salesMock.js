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

const salesMockByIdFromDB = [
  {
    date: '2023-08-15T15:41:42.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-08-15T15:41:42.000Z',
    productId: 2,
    quantity: 10,
  },
];

const salesMockByIdFromModel = [
  {
    date: '2023-08-15T15:41:42.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-08-15T15:41:42.000Z',
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  allSalesFromDB,
  allSalesFromModel,
  salesMockByIdFromDB,
  salesMockByIdFromModel,
};