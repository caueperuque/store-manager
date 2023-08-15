const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel, salesMockByIdFromDB, salesMockByIdFromModel } = require('../mocks/salesMock');
const { salesService } = require('../../../src/services');

describe('Testando a camada service de vendas', function () {
  it('Testa se o service de vendas possui o método findAll', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromDB[0]);

    const response = await salesService.findAll();

    expect(response).to.be.an('array');
    expect(response).to.deep.equal(allSalesFromModel);
  });

  it('Testa se o service de vendas possui o método findById', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesMockByIdFromDB);

    const response = await salesService.findById(1);

    expect(response).to.deep.equal(salesMockByIdFromModel);
    expect(response).to.be.an('array');
  });

  it('Testa se ao requisitar um id inválido, retorna uma mensagem de erro', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const response = await salesService.findById(14125);

    expect(response).to.deep.equal({ message: 'NOT_FOUND' });
    expect(response).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});