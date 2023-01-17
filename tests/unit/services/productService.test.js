const { expect } = require("chai");
const sinon = require("sinon");

const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const { productMock } = require("../mocks");

describe("Unit tests for productService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should get all products", async function () {
    sinon.stub(productModel, "getAll").resolves(productMock.getAllWithSuccess);
    const result = await productService.getAll();

    expect(result).to.deep.equal(productMock.getAllWithSuccess);
  });

  it("should find product by id with success", async function () {
    const output = productMock.getAllWithSuccess[0];
    sinon.stub(productModel, "findById").resolves(output);

    const result = await productService.findById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(output);
  });

  it("should fail to find product with invalid id", async function () {
    sinon.stub(productModel, "findById").resolves([[]]);
    const result = await productService.findById(0);

    expect(result.message).to.equal('"id" must be a number greater than 1');
  });

  it("should fail to find product with non existent id", async function () {
    sinon.stub(productModel, "findById").resolves(undefined);
    const output = { type: "PRODUCT_NOT_FOUND", message: "Product not found" };
    const nonExistentId = 999;

    const result = await productService.findById(nonExistentId);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });
});
