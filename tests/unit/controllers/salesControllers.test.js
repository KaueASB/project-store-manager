const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");

chai.use(chaiAsPromised);

const salesService = require('../../../services/salesService')
const salesController = require('../../../controllers/salesController');

describe('testando salesController', () => {
  beforeEach(sinon.restore);
  describe('getList', () => {
    it('caso o salesController dispare um erro', () => {
      sinon.stub(salesService, "getList").rejects();
      const item = salesController.getList();
      return chai.expect(item).to.eventually.be.rejected;
    });

    it('caso o salesController retorne o json correto', async () => {
      sinon.stub(salesService, "getList").resolves([{}]);
      const res = {}

      res.status = sinon.stub().returns();
      res.json = sinon.stub().returns([{}]);

      const item = await salesController.getList([{}], res);
      chai.expect(res.json.calledWith(item)).to.be.equal({})
      return chai.expect(res.status.calledWith(200)).to.be.equal(200);
    });
  });

  describe("getById", () => {
    it("deve disparar um erro caso salesController dispare um erro", () => {
      sinon.stub(salesService, "getById").rejects();
      chai.expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });

    it("deve retornar o objeto caso o salesController retorne com sucesso", async () => {
      const req = { params: { id: 1 } };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesService, "getById").resolves({});
      await salesController.getById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({});
    });

    it("deve retornar o status 404 caso salesController retorne com erro", async () => {
      const req = { params: { id: 90 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(false);
      await salesController.getById(req, res);
      return chai.expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it("deve retornar o status 200 caso salesController retorne com erro", async () => {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(true);
      await salesController.getById(req, res);
      return chai.expect(res.status.calledWith(200)).to.be.equal(true);
    });

  });

  // describe('addSale', () => {
  //   beforeEach(sinon.restore);
  //   it('deve disparar um erro caso salesService não retorne o id', () => {
  //     sinon.stub(salesService, "create").rejects();
  //     chai.expect(salesController.create({})).to.eventually.be.rejected;
  //   });

  //   it("deve retornar o status 201 caso salesController retorne com sucesso", async () => {
  //     const req = { body: { name: 'Kaue Alves' } };
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();


  //     sinon.stub(salesService, 'create').resolves(true);
  //     await salesController.create(req, res);
  //     return chai.expect(res.status.calledWith(201)).to.be.equal(true);
  //   });

  //   it("deve retornar o status 404 caso salesController retorne com erro", async () => {
  //     const req = { body: { name: 'Kaue Alves' } };
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon.stub(salesService, 'create').resolves(false);
  //     await salesController.create(req, res);
  //     return chai.expect(res.status.calledWith(404)).to.be.equal(true);
  //   });
  // })
})
