const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const Joi = require('joi');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('testando salesService', () => {
  describe('getList', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso o salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'getList').rejects();
      chai.expect(salesService.getList()).to.eventually.be.rejected;
    });

    it('deve retornar um array vazio caso salesModel retorne uma lista vazia', () => {
      sinon.stub(salesModel, 'getList').resolves([[]]);
      chai.expect(salesService.getList()).to.eventually.be.equal([]);
    });

    it("deve retornar uma lista caso salesModel retorne com sucesso", () => {
      sinon.stub(salesModel, 'getList').resolves([[{}]]);
      chai.expect(salesService.getList()).to.eventually.deep.equal({});
    });
  })

  describe('getById', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso salesModel dispare um erro', () => {
      sinon.stub(salesModel, 'getById').rejects();
      chai.expect(salesService.getById(4)).to.eventually.be.rejected;
    });
    it('deve retornar um array vazio caso salesModel retorne uma lista vazia', () => {
      sinon.stub(salesModel, 'getById').resolves([[[]]]);
      chai.expect(salesService.getById(4)).to.eventually.be.undefined;
    })
    it("deve retornar um item caso salesModel retorne com sucesso", () => {
      sinon.stub(salesModel, 'getById').resolves([[{}]]);
      chai.expect(salesService.getById(4)).to.eventually.deep.equal({});
    });
  })

  // describe('addSale', () => {
  //   beforeEach(sinon.restore);
  //   it('deve disparar um erro caso salesModel não retorne o id', () => {
  //     sinon.stub(salesModel, 'create').rejects();
  //     chai.expect(salesService.create(4)).to.eventually.be.rejected;
  //   });
  //   it("deve retornar o id caso salesModel crie com sucesso", () => {
  //     sinon.stub(salesModel, 'create').resolves(4);
  //     chai.expect(salesService.create('name')).to.eventually.deep.equal(4);
  //   });

  //   it("deve retornar uma mensagem de erro caso validateFields retorne false", () => {
  //     sinon.stub(salesModel, 'getList').resolves([[{}]]);
  //     chai.expect(salesService.getList()).to.eventually.deep.equal({});
  //   });
  // })
})