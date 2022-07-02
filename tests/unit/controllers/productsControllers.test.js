const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const productsService = require('../../../services/productsService')
const productsController = require('../../../controllers/productsController');

describe('testando productsController', () => {
  beforeEach(sinon.restore);
  describe('getList', () => {
    it('caso o productsController dispare um erro', () => {
      sinon.stub(productsService, "getList").rejects();
      const item = productsController.getList();
      return chai.expect(item).to.eventually.be.rejected;
    });

    it('caso o productsController retorne com sucesso', async () => {
      sinon.stub(productsService, "getList").resolves([{}]);
      const res = {}

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getList({}, res);
      return chai.expect(res.status.calledWith(200)).to.be.deep.equal(true);
    });
  });

  describe("getById", () => {
    it("deve disparar um erro caso productsController dispare um erro", () => {
      sinon.stub(productsService, "getById").rejects();
      chai.expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });

    it("deve retornar o objeto caso o productsController retorne com sucesso", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsService, "getById").resolves({});
      await productsController.getById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({});
    });

    it("deve retornar o status 404 caso productsController retorne com erro", async () => {
      const req = { params: { id: 90 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(false);
      await productsController.getById(req, res);
      return chai.expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it("deve retornar o status 200 caso productsController retorne com erro", async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(true);
      await productsController.getById(req, res);
      return chai.expect(res.status.calledWith(200)).to.be.equal(true);
    });

  });

  describe('create', () => {
    beforeEach(sinon.restore);
    it('deve disparar um erro caso productsService não retorne o id', () => {
      sinon.stub(productsService, "create").rejects();
      chai.expect(productsController.create({})).to.eventually.be.rejected;
    });

    it("deve retornar o status 201 caso productsController retorne com sucesso", async () => {
      const req = { body: { name: 'Kaue Alves' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();


      sinon.stub(productsService, 'create').resolves(true);
      await productsController.create(req, res);
      return chai.expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it("deve retornar o status 404 caso productsController retorne com erro", async () => {
      const req = { body: { name: 'Kaue Alves' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(false);
      await productsController.create(req, res);
      return chai.expect(res.status.calledWith(404)).to.be.equal(true);
    });
  })
})