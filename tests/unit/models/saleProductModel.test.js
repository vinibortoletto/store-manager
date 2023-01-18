const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../connection");

const { saleProductModel } = require("../../../src/models");
const saleModel = require('../../../src/models/saleModel')

const { saleMock } = require("../mocks");

describe("Unit tests for saleModel", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const output = saleMock.insertResponseWithSuccess.id;

    sinon.stub(saleModel, "insert").resolves(output);
    sinon.stub(connection, "execute").resolves([{ insertId: output }]);

    const result = await saleProductModel.insert(
      saleMock.insertBodyWithSuccess
    );

    expect(result).to.deep.equal(output);
  });
});
