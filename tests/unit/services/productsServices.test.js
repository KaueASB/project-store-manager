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
    it('deve disparar um erro caso o productsService dispare um erro', () => {
      sinon.stub(productsModel, 'getList').rejects();
      chai.expect(productsService.getList()).to.eventually.be.rejected;
    });

    it('deve retornar um array vazio caso productsService retorne uma lista vazia', () => {
      sinon.stub(productsModel, 'getList').resolves([[]]);
      chai.expect(productsService.getList()).to.eventually.be.equal([]);
    });

    it("deve retornar uma lista caso productsService retorne com sucesso", () => {
      sinon.stub(productsModel, 'getList').resolves([[{}]]);
      chai.expect(productsService.getList()).to.eventually.deep.equal({});
    });
  })

  describe('getById', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsService dispare um erro', () => {
      sinon.stub(productsModel, 'getById').rejects();
      chai.expect(productsService.getById(4)).to.eventually.be.rejected;
    });

    it('deve retornar um array vazio caso productsService retorne uma lista vazia', () => {
      sinon.stub(productsModel, 'getById').resolves([[[]]]);
      chai.expect(productsService.getById(4)).to.eventually.be.undefined;
    })

    it("deve retornar um item caso productsService retorne com sucesso", () => {
      sinon.stub(productsModel, 'getById').resolves([[{}]]);
      chai.expect(productsService.getById(4)).to.eventually.deep.equal({});
    });
  })

  describe('create', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsService não retorne o id', () => {
      sinon.stub(productsModel, 'create').rejects();
      chai.expect(productsService.create(4)).to.eventually.be.rejected;
    });

    it("deve retornar o id caso productsService crie com sucesso", () => {
      sinon.stub(productsModel, 'create').resolves(4);
      chai.expect(productsService.create('name')).to.eventually.deep.equal(4);
    });
  })

  describe('update', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsService não encontre o id', () => {
      sinon.stub(productsModel, 'update').rejects();
      chai.expect(productsService.update('name', 4)).to.eventually.be.rejected;
    });

    it("deve atualizar com sucesso caso productsService encontre o id", () => {
      sinon.stub(productsModel, 'update').resolves(4);
      chai.expect(productsService.update('name', 4)).to.eventually.deep.undefined;
    });
  })

  describe('remove', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsService não encontre o id', () => {
      sinon.stub(productsModel, 'remove').rejects();
      chai.expect(productsService.remove(4)).to.eventually.be.rejected;
    });

    it("deve remover com sucesso caso productsService encontre o id", () => {
      sinon.stub(productsModel, 'remove').resolves();
      chai.expect(productsService.remove(1)).to.eventually.deep.undefined;
    });
  })
})