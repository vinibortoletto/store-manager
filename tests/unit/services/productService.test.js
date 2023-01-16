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

  it('should find product by id with success', async function () {
    const output = productMock.getAllWithSuccess[0]
    sinon.stub(productModel, 'findById').resolves(output)
    const result = await productService.findById(1)
    expect(result).to.deep.equal(output)
  })

  it('should fail to find product by id', async function () {
    sinon.stub(productModel, 'findById').resolves([[]])
    const result = await productService.findById(0)
    expect(result).to.equal('Product not found')
  })
});