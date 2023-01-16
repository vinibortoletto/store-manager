const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../connection');
const { productMock } = require('../mocks');

describe('Unit tests for productModel', function() {
  it('should get all products with success', async function() {
    const output = productMock.getAllWithSuccess
    sinon.stub(connection, 'execute').resolves([output])
    const result = await productModel.getAll()
    expect(result).to.deep.equal(output)
  });
});