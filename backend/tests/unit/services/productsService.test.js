const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { findAllMock, findByIdMock, findByIdMockFromDB, createMockFromDB } = require('../mocks/productsMock');
const { productsModel } = require('../../../src/models');

describe('Testando a camada service de produtos', function () {
  it('Testa se ao chamar a função findAll, ele retorna todos produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(findAllMock);

    const response = await productsService.findAll();

    expect(response).to.be.an('array');
    expect(response).to.deep.equal(findAllMock);
  });

  it('Testa se ao chamar a função findById, ele retorna o produto com o id passado', async function () {
    sinon.stub(productsModel, 'findById').resolves(findByIdMockFromDB);

    const response = await productsService.findById(1);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal(findByIdMock);
  });

  it('Testa se ao chamar a função findById e não for encontrado um produto com o id retorna uma mensagem de erro', async function () {
    sinon.stub(productsModel, 'findById').resolves();

    const response = await productsService.findById(1124);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal({ message: 'NOT_FOUND' });
  });

  it('Testa se ao chamar a função create funciona corretamente', async function () {
    sinon.stub(productsModel, 'create')
      .resolves(createMockFromDB);
  
    const response = await productsService.create('ProdutoX');
    expect(response.name).to.deep.equal('ProdutoX');
  });

  afterEach(function () {
    sinon.restore();
  });
});