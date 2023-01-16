const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const mock = require("./mocks/productController.mock");
const { productController } = require("../../../src/controllers");
const { productService } = require("../../../src/services");

describe("Unit tests for productController", function () {
  it("should get all products", async function () {
    const res = {};
    const req = {};
    const output = mock.productsResponse

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "getAll")
      .resolves(output);

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.productsResponse);
  });
});
