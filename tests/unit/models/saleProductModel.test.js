const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../connection");

const { saleProductModel } = require("../../../src/models");
const saleModel = require("../../../src/models/saleModel");

const { saleMock } = require("../mocks");

describe("Unit tests for saleProductModel", function () {
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

  it("should find sale by id with success", async function () {
    const output = saleMock.insertResponseWithSuccess;

    sinon.stub(connection, "execute").resolves(output);

    const result = await saleProductModel.findById(output.id);
    expect(result).to.deep.equal(output);
  });
});
