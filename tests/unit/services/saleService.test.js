const { expect } = require("chai");
const sinon = require("sinon");

const { saleModel } = require("../../../src/models");
const { saleService } = require("../../../src/services");
const { saleMock } = require("../mocks");

describe("Unit tests for saleService", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const output = saleMock.insertResponseWithSuccess.id
    sinon.stub(saleModel, 'insert').resolves(output)

    const result = await saleService.insert(saleMock.insertBodyWithSuccess)

    expect(result.type).to.equal(null)
    expect(result.message).to.equal(output)
  });
});
