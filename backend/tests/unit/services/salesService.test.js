const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, allSalesFromModel, salesMockByIdFromDB, salesMockByIdFromModel, salesCreateMockFromDB, salesCreateMockFromModel } = require('../mocks/salesMock');
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

  it('Cadastrando uma venda com sucesso', async function () {
    sinon.stub(salesModel, 'create').resolves(salesCreateMockFromModel);
    const responseData = { id: salesCreateMockFromDB, itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    const responseService = await salesService.create([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);
    expect(responseService.data).to.be.deep.equal(responseData);
  });
  afterEach(function () {
    sinon.restore();
  });
});