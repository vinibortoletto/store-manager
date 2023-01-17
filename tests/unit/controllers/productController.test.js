const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productMock } = require("../mocks");
const { productController } = require("../../../src/controllers");
const { productService } = require("../../../src/services");
const httpStatus = require("../../../src/utils/httpStatus");

describe("Unit tests for productController", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should get all products", async function () {
    const res = {};
    const req = {};

    const output = productMock.getAllWithSuccess;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, "getAll").resolves(output);

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output);
  });

  it("should find product by id with success", async function () {
    const res = {};
    const req = { params: { id: 1 } };

    const output = {
      type: null,
      message: productMock.getAllWithSuccess[0]
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "findById").resolves(output);

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output.message);
  });

  it("should fail to find product by id", async function () {
    const res = {};
    const req = { params: { id: 0 } };

    const output = {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found'
    }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "findById").resolves(output);

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
    expect(res.json).to.have.been.calledWith({message: output.message});
  });
});
