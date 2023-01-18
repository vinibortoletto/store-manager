const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../connection");

const { saleModel } = require("../../../src/models");
const { saleMock } = require("../mocks");

describe("Unit tests for saleModel", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const output = saleMock.insertResponseWithSuccess.id;
    
    sinon
      .stub(connection, "execute")
      .resolves([{ insertId: output }]);
    
    const result = await saleModel.insert();
    
    expect(result).to.deep.equal(output);
  });
});
