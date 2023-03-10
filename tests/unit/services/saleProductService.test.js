const { expect } = require("chai");
const sinon = require("sinon");

const { saleProductModel, productModel } = require("../../../src/models");
const { saleProductService, productService } = require("../../../src/services");
const { saleMock } = require("../mocks");

describe("Unit tests for saleProductService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const output = saleMock.insertResponseWithSuccess;
    sinon.stub(productModel, "findById").resolves(true);
    sinon.stub(saleProductModel, "insert").resolves(output.id);

    const result = await saleProductService.insert(
      saleMock.insertBodyWithSuccess
    );

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(output);
  });

  it("should fail to insert new sale without productId", async function () {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"productId" is required',
    };

    const result = await saleProductService.insert(
      saleMock.insertBodyWithoutProductId
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to insert new sale if a product in the list does not exists", async function () {
    const output = {
      type: "PRODUCT_NOT_FOUND",
      message: "Product not found",
    };

    const result = await saleProductService.insert(
      saleMock.insertBodyWithWrongProductId
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to insert new sale without quantity", async function () {
    const output = {
      type: "VALUE_REQUIRED",
      message: '"quantity" is required',
    };

    const result = await saleProductService.insert(
      saleMock.insertBodyWithoutQuantity
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to insert new sale with quantity less or equal 0", async function () {
    const output = {
      type: "INVALID_VALUE",
      message: '"quantity" must be greater than or equal to 1',
    };

    const result = await saleProductService.insert(
      saleMock.insertBodyWithWrongQuantity
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to find sale by id if it does not exists", async function () {
    const output = {
      type: "SALE_NOT_FOUND",
      message: "Sale not found",
    };

    sinon.stub(saleProductModel, "findById").resolves([]);

    const result = await saleProductService.findById(9999);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should fail to find sale by id if id is invalid", async function () {
    const output = {
      type: "INVALID_VALUE",
      message: '"id" must be a number greater than 0',
    };

    sinon.stub(saleProductModel, "findById").resolves(undefined);

    const result = await saleProductService.findById(0);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should find sale by id with success", async function () {
    const output = saleMock.insertResponseWithSuccess;
    sinon.stub(saleProductModel, "findById").resolves(output);

    const result = await saleProductService.findById(output.id);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(output);
  });

  it("should get all sales with success", async function () {
    const output = saleMock.getAllResponseWithSuccess;
    sinon.stub(saleProductModel, "getAll").resolves(output);

    const result = await saleProductService.getAll();

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(output);
  });

  it("should remove sale with success", async function () {
    sinon.stub(saleProductModel, "findById").resolves(true);
    sinon.stub(saleProductModel, "remove").resolves(true);

    const result = await saleProductService.remove(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal("");
  });

  it("should fail to remove sale that does not exists", async function () {
    const output = { type: "SALE_NOT_FOUND", message: "Sale not found" };

    sinon.stub(saleProductService, "findById").resolves(output);

    const result = await saleProductService.remove(999);

    expect(result.type).to.equal(output.type);
    expect(result.message).to.equal(output.message);
  });

  it("should update sale with success", async function () {
    const output = {
      type: null,
      message: saleMock.updateSaleResponseWithSuccess,
    };

    sinon
      .stub(saleProductService, "findById")
      .resolves({ type: null, message: "" });

    sinon.stub(productService, "findById").resolves(false);

    sinon.stub(saleProductModel, "update").resolves(true);

    const result = await saleProductService.update(
      saleMock.updateSaleBodyWithSuccess,
      1
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

  it("should fail to update sale that does not exists", async function () {
    const output = {
      type: "SALE_NOT_FOUND",
      message: "Sale not found",
    };
    
    sinon
      .stub(saleProductService, "findById")
      .resolves(false);
      
    sinon.stub(saleProductModel, "update").resolves();

    const result = await saleProductService.update(
      saleMock.updateSaleBodyWithSuccess,
      999
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });

   it("should fail to update sale with product that does not exists", async function () {
    const output = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
    
    sinon
      .stub(saleProductService, "findById")
      .resolves(false);
      
    sinon.stub(productService, "findById").resolves(output);
    
    const result = await saleProductService.update(
      saleMock.updateSaleBodyWithWrongProductId,
      1
    );

    expect(result.type).to.equal(output.type);
    expect(result.message).to.deep.equal(output.message);
  });
});
