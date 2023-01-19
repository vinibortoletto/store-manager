const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { saleProductService } = require("../../../src/services");
const { saleProductController } = require("../../../src/controllers");
const { saleMock } = require("../mocks");
const httpStatus = require("../../../src/utils/httpStatus");

const { expect } = chai;
chai.use(sinonChai);

describe("Unit tests for saleController", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const res = {};
    const req = {};

    const output = saleMock.insertResponseWithSuccess

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(saleProductService, "insert").resolves({
      type: null,
      message: output
    });

    await saleProductController.insert(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output);
  })
})