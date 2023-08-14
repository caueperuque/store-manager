const sinon = require('sinon');
const chai = require('chai');
const connection = require('../../../src/models/connection');
const { allManagers } = require('../mocks/productsModelMock');
const app = require('../../../src/app');

describe('Testando o model de produtos', function () {
  const { expect } = chai;
  beforeEach(function () {
    sinon.stub(connection, 'execute').resolves(allManagers);
  });

  it('Testa se o model de produtos possui o método findAll', async function () {
    const response = await chai.request(app).get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allManagers);
  });

  afterEach(function () {
    sinon.restore();
  });
});