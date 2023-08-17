const findAllMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const findAllMockFromDB = [
  [{
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  }],
  null,
];

const findByIdMock = {
  id: 1,
  name: 'Martelo de Thor',
};

const findByIdMockFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const createMockFromDB = [{ 
  id: '4',
  name: 'ProdutoX',
}];

const createMockFromModel = [{
  id: '4',
  name: 'ProdutoX',
}];

const updateMockFromDB = {
  id: 1,
  name: 'martelo do hulk',
};

const updateMockFromModel = {
  id: 1,
  name: 'martelo do hulk',
};

module.exports = {
  findAllMock,
  findAllMockFromDB,
  findByIdMock,
  findByIdMockFromDB,
  createMockFromDB,
  createMockFromModel,
  updateMockFromDB,
  updateMockFromModel,
};