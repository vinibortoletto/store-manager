const { expect } = require("chai");
const sinon = require("sinon");
const { saleProductModel } = require("../../../src/models");

const { saleProductService } = require("../../../src/services");
const { saleMock } = require("../mocks");

describe.only("Unit tests for saleProductService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    sinon
      .stub(saleProductModel, "insert")
      .resolves(saleMock.insertResponseWithSuccess.id);

    const result = await saleProductService.insert(saleMock.insertBodyWithSuccess);
    
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(saleMock.insertResponseWithSuccess);
  });
});