// const { expect } = require('chai');
const sinon = require('sinon');
// const { productsController } = require('../../../src/controllers');
// const connection = require('../../../src/models/connection');
// const { findAllMockFromDB, findAllMock } = require('../mocks/productsModelMock');

describe('Testando a camada controller de produtos', function () {
  it('Testa se o controller de produtos possui o método findAll', async function () {
    // const response = await productsController.findAll();
    // console.log(response);

    // expect(response).to.be.an('array');
    // expect(response).to.deep.equal(findAllMock);
  });

  // it('Testa se o controller de produtos possui o método findById', async function () {
  //   sinon.stub(connection, 'execute').resolves(findAllMockFromDB);
  //   const response = await productsController.findById(1);

  //   expect(response).to.be.an('object');
  //   expect(response).to.deep.equal(findAllMock[0]);
  // });
  afterEach(function () {
    sinon.restore();
  });
});
