const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const connection = require('../../../src/models/connection');
const { findAllMockFromDB, findAllMock } = require('../mocks/productsModelMock');

// criar teste para id invalido
describe('Testando a camada service de produtos', function () {
  it('Testa se o service de produtos possui o método findAll', async function () {
    const response = await productsService.findAll();
    // console.log(response);
    expect(response).to.be.an('array');
    expect(response).to.deep.equal(findAllMock);
  });

  it('Testa se o service encontra o produto com id válido', async function () {
    sinon.stub(connection, 'execute').resolves(findAllMockFromDB);
    const response = await productsService.findById(1);
    expect(response).to.be.an('object');
    expect(response).to.deep.equal(findAllMock[0]);
  });

  it('Testa se o service me retorna uma menssagem de erro quando o id não é válido', async function () {
    const response = await productsService.findById(4);
    expect(response).to.have.property('message', 'NOT_FOUND');
  });

  afterEach(function () {
    sinon.restore();
  });
});