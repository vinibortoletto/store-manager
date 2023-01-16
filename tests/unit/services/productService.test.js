const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productMock } = require('../mocks');

describe('Unit tests for productService', function() {
  afterEach(function() {sinon.restore()})

  it('should get all products', async function() {
    sinon.stub(productModel, 'getAll').resolves(productMock.getAllWithSuccess)

    const result = await productService.getAll()
    expect(result).to.deep.equal(productMock.getAllWithSuccess)
  });
});