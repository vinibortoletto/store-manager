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
    sinon.stub(saleProductModel, 'findById').resolves(saleMock.findByIdResponseWithSuccess)

    const result = await saleProductService.insert(saleMock.insertBodyWithSuccess)

    expect(result.type).to.equal(null)
    expect(result.message).to.deep.equal(output)
  });

  it('should fail to insert new sale without productId', async function () {
    const output = {
      type: 'VALUE_REQUIRED',
      message: '"productId" is required'
    }

    const result = await saleProductService.insert(saleMock.insertBodyWithoutProductId)

    expect(result.type).to.equal(output.type)
    expect(result.message).to.equal(output.message)
  })

  it('should fail to insert new sale without quantity', async function () {
    const output = {
      type: 'VALUE_REQUIRED',
      message: '"quantity" is required'
    }

    const result = await saleProductService.insert(saleMock.insertBodyWithoutQuantity)

    expect(result.type).to.equal(output.type)
    expect(result.message).to.equal(output.message)
  })

  it("should find sale by id with success", async function () {
    const output = saleMock.insertResponseWithSuccess
    sinon.stub(saleProductModel, 'findById').resolves(output)

    const result = await saleProductService.findById(output.id)

    expect(result.type).to.equal(null)
    expect(result.message).to.equal(output)
  });
});
