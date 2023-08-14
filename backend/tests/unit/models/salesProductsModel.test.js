const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel } = require('../mocks/salesMock');

describe('Testando a camada model de vendas', function () {
  it('Testa se o model de vendas possui o método findAll', async function () {
    sinon.stub(connection, 'execute').resolves(allSalesFromDB);

    const response = await salesModel.findAll();

    expect(response).to.deep.equal(allSalesFromModel);
    expect(response).to.be.an('array');
  });
  
  it('Testa se o model de vendas possui o método findById', async function () {
    sinon.stub(connection, 'execute').resolves(allSalesFromDB[0]);

    const response = await salesModel.findById(1);

    expect(response).to.deep.equal(allSalesFromModel[0]);
    expect(response).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});