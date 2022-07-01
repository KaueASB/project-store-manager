const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const Joi = require('joi');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('testando productsService', () => {
  describe('getList', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso o productsModel dispare um erro', () => {
      sinon.stub(productsModel, 'getList').rejects();
      chai.expect(productsService.getList()).to.eventually.be.rejected;
    });
    it('deve retornar um array vazio caso productsModel retorne uma lista vazia', () => {
      sinon.stub(productsModel, 'getList').resolves([[]]);
      chai.expect(productsService.getList()).to.eventually.be.equal([]);
    });
    it("deve retornar uma lista caso productsModel retorne com sucesso", () => {
      sinon.stub(productsModel, 'getList').resolves([[{}]]);
      chai.expect(productsService.getList()).to.eventually.deep.equal({});
    });
  })

  describe('getById', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsModel dispare um erro', () => {
      sinon.stub(productsModel, 'getById').rejects();
      chai.expect(productsService.getById(4)).to.eventually.be.rejected;
    });
    it('deve retornar um array vazio caso productsModel retorne uma lista vazia', () => {
      sinon.stub(productsModel, 'getById').resolves([[[]]]);
      chai.expect(productsService.getById(4)).to.eventually.be.undefined;
    })
    it("deve retornar um item caso productsModel retorne com sucesso", () => {
      sinon.stub(productsModel, 'getById').resolves([[{}]]);
      chai.expect(productsService.getById(4)).to.eventually.deep.equal({});
    });
  })

  describe('create', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsModel não retorne o id', () => {
      sinon.stub(productsModel, 'create').rejects();
      chai.expect(productsService.create(4)).to.eventually.be.rejected;
    });
    it("deve retornar o id caso productsModel crie com sucesso", () => {
      sinon.stub(productsModel, 'create').resolves(4);
      chai.expect(productsService.create('name')).to.eventually.deep.equal(4);
    });
  })
})