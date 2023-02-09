const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../connection");
const { productMock } = require("../mocks");

describe("Unit tests for productModel", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should get all products with success", async function () {
    const output = productMock.getAllWithSuccess;
    sinon.stub(connection, "execute").resolves([output]);
    const result = await productModel.getAll();
    expect(result).to.deep.equal(output);
  });

  it("should find product by id with success", async function () {
    const output = productMock.getAllWithSuccess[0];
    sinon.stub(connection, "execute").resolves([[output]]);
    const result = await productModel.findById(1);
    expect(result).to.deep.equal(output);
  });

  it("should insert new product with success", async function () {
    const output = productMock.insertWithSuccess;
    sinon
      .stub(connection, "execute")
      .resolves([{ insertId: productMock.insertWithSuccess.id }]);
    const result = await productModel.insert(productMock.insertWithSuccess);
    expect(result).to.equal(productMock.insertWithSuccess.id);
  });

  it("should update product with success", async function () {
    const output = productMock.updateResponseWithSuccess;
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    const result = await productModel.update(
      productMock.updateBodyWithSuccess,
      output.id
    );
    expect(result).to.equal(output.id);
  });

  it("should remove product with success", async function () {
    const output = productMock.updateResponseWithSuccess;
    sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);
    const result = await productModel.remove(1);
    expect(result).to.equal(1);
  });

  it.only("should search product with success", async function () {
    const output = productMock.searchResponseWithSuccess;
    const searchTerm = "Martelo";
    sinon.stub(connection, "execute").resolves(output);
    const result = await productModel.search(searchTerm);
    expect(result).to.deep.equal(output);
  });
});
