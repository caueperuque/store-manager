const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { findAllMockFromDB, findAllMock, createMockFromDB, createMockFromModel } = require('../mocks/productsMock');
const { productsModel } = require('../../../src/models');

describe('Testando a camada model de produtos', function () {
  it('Testa se o model de produtos possui o método findAll', async function () {
    sinon.stub(connection, 'execute').resolves(findAllMockFromDB);
    const response = await productsModel.findAll();
    // console.log(response[1]);

    expect(response).to.deep.equal(findAllMock);
    expect(response).to.be.an('array');
  });

  it('Testa se o model de produtos possui o método findById', async function () {
    sinon.stub(connection, 'execute').resolves(findAllMockFromDB);
    const response = await productsModel.findById(1);

    expect(response).to.deep.equal(findAllMock[0]);
    expect(response).to.be.an('object');
  });

  it('Testa se o model de produtos possui o método create', async function () {
    sinon.stub(connection, 'execute').resolves(createMockFromDB);

    const response = await productsModel.create('ProdutoX');

    expect([response]).to.deep.equal(createMockFromModel);
    expect(response).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});