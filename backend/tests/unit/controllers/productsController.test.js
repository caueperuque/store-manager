const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const { findAllMockFromDB, findAllMock, findByIdMockFromDB, findByIdMock } = require('../mocks/productsMock');
const { productsController } = require('../../../src/controllers');

describe('Testando a camada controller de products', function () {
  it('Testa se a função findAll retorna um array', async function () {
    sinon.stub(productsController, 'findAll').resolves(findAllMockFromDB);
    const response = await productsController.findAll();
    expect(response).to.be.an('array');
    expect(response[0]).to.deep.equal(findAllMock);
  });

  it('Testa se a função findById retorna um objeto', async function () {
    sinon.stub(productsController, 'findById').resolves(findByIdMockFromDB[0]);

    const req = {
      params: { id: 1 },
    };

    const response = await productsController.findById(req);
    expect(response).to.be.an('object');
    expect(response).to.deep.equal(findByIdMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});