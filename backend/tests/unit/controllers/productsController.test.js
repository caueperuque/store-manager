const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const { findAllMockFromDB, findByIdMockFromDB } = require('../mocks/productsMock');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

describe('Testando a camada controller de products', function () {
  it('Testa se a função findAll retorna um array', async function () {
    sinon.stub(productsService, 'findAll').resolves(findAllMockFromDB);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }; 
    await productsController.findAll(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa se a função findById retorna um objeto', async function () {
    sinon.stub(productsService, 'findById').resolves(findByIdMockFromDB);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('Testa se a função findById retorna uma mensagem de erro, caso o id seja inválido', async function () {
    sinon.stub(productsService, 'findById').resolves({ message: 'NOT_FOUND' });

    const req = {
      params: { id: 1235079 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.findById(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});