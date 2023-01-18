const { expect } = require("chai");
const sinon = require("sinon");

// const { saleModel } = require("../../../src/models");
// const { saleService } = require("../../../src/services");
// const { saleMock } = require("../mocks");

describe("Unit tests for saleProductService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    sinon
      .stub(saleModel, "insert")
      .resolves(saleMock.insertResponseWithSuccess.id);

    sinon
      .stub(saleModel, "findById")
      .resolves(saleMock.insertResponseWithSuccess);

    const result = await saleService.insert(saleMock.insertBodyWithSuccess);

    expect(result.type).to.equal(null);
    expect(result.message).to.equal(saleMock.insertResponseWithSuccess);
  });
});
