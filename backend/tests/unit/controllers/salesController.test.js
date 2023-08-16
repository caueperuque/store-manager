const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSalesFromDB, salesMockByIdFromDB } = require('../mocks/salesMock');

describe('Testes na camada controller de sales', function () {
  it('Testa se a função findAll retorna o status 200', async function () {
    sinon.stub(salesService, 'findAll').resolves(allSalesFromDB);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa se a função findById retorna o status 200', async function () {
    sinon.stub(salesService, 'findById').resolves(salesMockByIdFromDB);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });
  it('Testa se a função findById retorna o status 404 caso a venda não seja encontrada', async function () {
    sinon.stub(salesService, 'findById').resolves({ message: 'NOT_FOUND' });

    const req = { params: { id: 1124 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
  });

  it('Testa se a função create retorna o status 201', async function () {
    sinon.stub(salesService, 'create').resolves({});

    const req = { body: { products: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.create(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});
