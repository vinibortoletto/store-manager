const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const mocks = require("./mocks/productController.mock");

const { expect } = chai;
chai.use(sinonChai);

describe("Unit tests for productController", function () {
  it("should get all products", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
    sinon.stub(productService, 'getAll').resolves(productsResponse)

    await productController.getAll(req, res)

    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith(mocks.productsResponse)
  });
});
