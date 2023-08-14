const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { findAllMockFromDB, findAllMock } = require('../mocks/productsMock');
const { productsModel } = require('../../../src/models');

describe('Testando a camada model de produtos', function () {
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves(findAllMockFromDB);
  });

  it('Testa se o model de produtos possui o método findAll', async function () {
    const response = await productsModel.findAll();
    // console.log(response[1]);

    expect(response).to.deep.equal(findAllMock);
    expect(response).to.be.an('array');
  });

  it('Testa se o model de produtos possui o método findById', async function () {
    const response = await productsModel.findById(1);

    expect(response).to.deep.equal(findAllMock[0]);
    expect(response).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});