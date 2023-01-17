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

  it('should insert new product with success', async function () {
    const output = productMock.insertWithSuccess
    sinon.stub(connection, 'execute').resolves([{insertId: productMock.insertWithSuccess.id}])
    const result = await productModel.insert(productMock.insertWithSuccess.name)
    expect(result).to.equal(productMock.insertWithSuccess.id)
  })
});
