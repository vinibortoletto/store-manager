const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { saleProductService } = require("../../../src/services");
const { saleProductController } = require("../../../src/controllers");
const { saleMock } = require("../mocks");
const httpStatus = require("../../../src/utils/httpStatus");

const { expect } = chai;
chai.use(sinonChai);

describe("Unit tests for saleProductController", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const res = {};
    const req = {};

    const output = saleMock.insertResponseWithSuccess;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "insert").resolves({
      type: null,
      message: output,
    });

    await saleProductController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
    expect(res.json).to.have.been.calledWith(output);
  });

  it("should fail to insert new sale without productId", async function () {
    const res = {};
    const req = {};

    const output = {
      type: "VALUE_REQUIRED",
      message: '"productId" is required',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "insert").resolves(output);

    await saleProductController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({ message: output.message });
  });

  it("should get all sales with success", async function () {
    const res = {};
    const req = {};

    const output = {
      type: null,
      message: saleMock.getAllResponseWithSuccess,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "getAll").resolves(output);

    await saleProductController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output.message);
  });

  it("should fail to find sale by id if it does not exists", async function () {
    const res = {};
    const req = {
      params: {id: 9999}
    };

    const output = {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "findById").resolves(output);

    await saleProductController.findById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({message: output.message});
  });

  it("should find sale by id with success", async function () {
    const res = {};
    const req = {
      params: { id: 1}
    };

    const output = {
      type: null,
      message: saleMock.findByIdResponseWithSuccess,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "findById").resolves(output);

    await saleProductController.findById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output.message);
  });


  it("should remove sale with success", async function () {
    const res = {};
    const req = {
      params: { id: 1}
    };

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(saleProductService, "remove").resolves({ type: null, message: '' });

    await saleProductController.remove(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NO_CONTENT);
    expect(res.end).to.have.been.calledWith();
  });

  it("should fail to remove that does not exists", async function () {
    const res = {};
    const req = {
      params: { id: 999}
    };

    const output = { type: 'SALE_NOT_FOUND', message: 'Sale not found' }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "remove").resolves(output);

    await saleProductController.remove(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({message: output.message});
  });

  it("should update sale with success", async function () {
    const res = {};
    const req = {};

    const output = saleMock.updateSaleResponseWithSuccess

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "update").resolves({
      type: null,
      message: output,
    });

    await saleProductController.update(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output);
  });

  it("should fail to update sale that does not exists", async function () {
    const res = {};
    const req = {};

    const output = {
      type: 'SALE_NOT_FOUND',
      message: 'Sale not found'
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "update").resolves(output);
    await saleProductController.update(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({ message:output.message });
  });
});
