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
  afterEach(function () { sinon.restore() })
  
  it("should get all products", async function () {
    const res = {};
    const req = {};
    
    const output = productMock.getAllWithSuccess

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    sinon
      .stub(productService, "getAll")
      .resolves(output);

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(httpStatus.OK);
    expect(res.json).to.have.been.calledWith(output);
  });
});
