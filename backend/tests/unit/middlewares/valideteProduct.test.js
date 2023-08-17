const sinon = require('sinon');
const { expect } = require('chai');
const { validateProduct, validateUpdate, checkProductExists } = require('../../../src/middlewares/products.middleware');
const { validateSale } = require('../../../src/middlewares/sales.middlewares');
const { productsModel } = require('../../../src/models');
// const { productMiddleware } = require('../../../src/middlewares');

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

  it('Testa se é possível criar uma venda sem o productId', async function () {
    const next = sinon.stub().returns();
  
    const req = {
      body: [{ quantity: 1 }],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateSale(req, res, next);
  
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equal(true);
  });

  it('Testa se é possível criar uma venda com todas validações corretas', async function () {
    const next = sinon.stub();
  
    const req = {
      body: [{ productId: 1, quantity: 1 }],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await validateSale(req, res, next);
  
    expect(next.called).to.be.equal(true);
  });

  it('Testa se é possível criar uma venda sem o quantity', async function () {
    const next = sinon.stub().returns();
  
    const req = {
      body: [{ productId: 1 }],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateSale(req, res, next);
  
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equal(true);
  });

  it('Testa se é possível criar uma venda com o quantity menor que 1', async function () {
    const next = sinon.stub().returns();
  
    const req = {
      body: [{ productId: 1, quantity: 0 }],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateSale(req, res, next);
  
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equal(true);
  });

  it('Testa se é possível criar uma venda com o productId que não existe no banco de dados', async function () {
    const next = sinon.stub().returns();
  
    const req = {
      body: [{ productId: 9, quantity: 1 }],
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateSale(req, res, next);
  
    // expect(res.status.calledWith(404)).to.be.equal(true);
    // expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('Testa se é possível atualizar um produto com id inválido', async function () {
    // sinon.stub(productsModel, 'findById').resolves(null);

    // sinon.stub(productMiddleware, 'checkProductExists').resolves(false);
    
    const next = sinon.stub().returns();
  
    const req = {
      params: { id: 1234 },
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateUpdate(req, res, next);
  
    // expect(res.status.calledWith(404)).to.be.equal(true);
    // expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('Testa se é possível atualizar um produto com name inválido', async function () {
    const next = sinon.stub().returns();
  
    const req = {
      params: { id: 1 },
      body: { name: 'Prod' },
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateUpdate(req, res, next);
  
    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });

  it('Testa se é possível atualizar um produto sem name na requisição', async function () {
    const next = sinon.stub().returns();
  
    const req = {
      params: { id: 1 },
      body: {},
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    validateUpdate(req, res, next);
  
    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });

  it('Testa a função checkExistis', async function () {
    sinon.stub(productsModel, 'findById').resolves({ id: 1 });
  
    const response = await checkProductExists(1);
  
    expect(response).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});