const sinon = require('sinon');
const { expect } = require('chai');
const { validateProduct } = require('../../../src/middlewares/products.middleware');

describe('Testa a validação de produtos', function () {
  it('Testa se a validação funciona', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: {
        name: 'ProdutoX',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next);

    expect(next.calledWith()).to.be.equal(true);
  });

  it('Testa se não é possível enviar um body sem name', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: {},
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });

  it('Testa se não é possível enviar um name com menos de 5 caracteres', async function () {
    const next = sinon.stub().returns();

    const req = {
      body: {
        name: 'Prod',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    validateProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });
});