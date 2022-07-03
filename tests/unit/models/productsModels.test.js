const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const db = require('../../../models/db');
const productsModel = require('../../../models/productsModel');

describe('testando productsModel', () => {
  describe('getList', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso o db dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getList()).to.eventually.be.rejected;
    });

    it('deve retornar um array vazio caso db retorne uma lista vazia', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.getList()).to.eventually.be.equal([]);
    });

    it("deve retornar uma lista caso db retorne com sucesso", () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.getList()).to.eventually.deep.equal({});
    });
  })

  describe('getById', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.getById(4)).to.eventually.be.rejected;
    });

    it('deve retornar um array vazio caso db retorne uma lista vazia', () => {
      sinon.stub(db, 'query').resolves([[[]]]);
      chai.expect(productsModel.getById(4)).to.eventually.be.undefined;
    })

    it("deve retornar um item caso db retorne com sucesso", () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.getById(4)).to.eventually.deep.equal({});
    });
  })

  describe('create', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db não retorne o insertId', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.create('name')).to.eventually.be.rejected;
    });

    it("deve retornar o insertId caso db crie com sucesso", () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);
      chai.expect(productsModel.create('name')).to.eventually.deep.equal(1);
    });
  })

  describe('update', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db não retorne o affectedRows', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.update('name', 4)).to.eventually.be.rejected;
    });

    it("deve retornar o affectedRows caso db atualize com sucesso", () => {
      sinon.stub(db, 'query').resolves([{ affectedRows: 1 }]);
      chai.expect(productsModel.update('name', 4)).to.eventually.deep.equal(1);
    });
  })

  describe('remove', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso db não retorne o affectedRows', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.remove(4)).to.eventually.be.rejected;
    });

    it("deve retornar o affectedRows caso db remova com sucesso", () => {
      sinon.stub(db, 'query').resolves([{ affectedRows : 1}]);
      chai.expect(productsModel.remove(4)).to.eventually.deep.equal(1);
    });
  })
})