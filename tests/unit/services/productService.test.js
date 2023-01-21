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

  it("should insert new product with success", async function () {
    sinon
      .stub(productModel, "insert")
      .resolves(productMock.insertWithSuccess.id);
    sinon
      .stub(productModel, "findById")
      .resolves(productMock.insertWithSuccess);

    const result = await productService.insert({
      name: productMock.insertWithSuccess.name,
    });

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(productMock.insertWithSuccess);
  });

  it("should fail to insert new product without a name", async function () {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"name" is required',
    };

    const result = await productService.insert({});

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to insert new product with invalid name", async function () {
    const output = {
      type: "INVALID_VALUE",
      message: '"name" length must be at least 5 characters long',
    };

    const result = await productService.insert({ name: "aaaa" });

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to update a product without a name", async function () {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"name" is required',
    };

    const result = await productService.update({});

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to update a product that does not exist", async function () {
    const output = { type: "PRODUCT_NOT_FOUND", message: "Product not found" };

    const result = await productService.update(
      { name: productMock.updateBodyWithSuccess.name },
      999
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should update product with success", async function () {
    const output = {
      type: null,
      message: productMock.updateResponseWithSuccess,
    };

    sinon.stub(productModel, 'findById').resolves(output.message)
    sinon.stub(productModel, 'update').resolves(true)

    const result = await productService.update(
      productMock.updateBodyWithSuccess,
      productMock.updateResponseWithSuccess.id
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

  it("should remove product with success", async function () {
    const output = {
      type: null,
      message: '',
    };

    sinon.stub(productModel, 'findById').resolves(true)

    const result = await productService.remove(1);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

  it("should fail to remove product that does not exist", async function () {
    const output = {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };

    const result = await productService.remove(999);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });
});
