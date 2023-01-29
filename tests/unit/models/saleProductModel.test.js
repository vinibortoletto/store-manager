const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../connection");

const { saleProductModel } = require("../../../src/models");
const { saleMock } = require("../mocks");

describe("Unit tests for saleProductModel", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("should insert new sale with success", async function () {
    const output = saleMock.insertResponseWithSuccess.id;
    sinon.stub(connection, "execute").resolves([{ insertId: output }]);
    const result = await saleProductModel.insert(
      saleMock.insertBodyWithSuccess
    );
    expect(result).to.deep.equal(output);
  });

  it("should find sale by id with success", async function () {
    const output = saleMock.findByIdResponseWithSuccess;
    sinon.stub(connection, "execute").resolves([output]);
    const result = await saleProductModel.findById(1);
    expect(result).to.deep.equal(output);
  });

  it("should get all sales with success", async function () {
    const output = saleMock.getAllResponseWithSuccess;
    sinon.stub(connection, "execute").resolves([output]);
    const result = await saleProductModel.getAll();
    expect(result).to.deep.equal(output);
  });

  it('should remove sale with success', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}])
    const result = await saleProductModel.remove(1)
    expect(result).to.equal(1)
  })

  it('should update sale with success', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}])
    const result = await saleProductModel.update(saleMock.updateSaleBodyWithSuccess, 1)
    expect(result).to.equal(1)
  })
});
