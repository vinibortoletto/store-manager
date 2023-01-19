const { expect } = require("chai");
const sinon = require("sinon");

const { saleProductModel } = require("../../../src/models");
const { saleProductService } = require("../../../src/services");
const { saleMock } = require("../mocks");

describe("Unit tests for saleProductService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const output = saleMock.insertResponseWithSuccess
    sinon.stub(saleProductModel, 'insert').resolves(output.id)
    sinon.stub(saleProductModel, 'findById').resolves(output)

    const result = await saleProductService.insert(saleMock.insertBodyWithSuccess)

    expect(result.type).to.equal(null)
    expect(result.message).to.equal(output)
  });

  it("should find sale by id with success", async function () {
    const output = saleMock.insertResponseWithSuccess
    sinon.stub(saleProductModel, 'findById').resolves(output)

    const result = await saleProductService.findById(output.id)

    expect(result.type).to.equal(null)
    expect(result.message).to.equal(output)
  });
});
