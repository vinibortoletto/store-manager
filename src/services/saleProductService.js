const { saleProductModel } = require('../models');
const { validateId } = require('./validations/validateId');
const { validateNewSale } = require('./validations/validateNewSale');
const { validateProductList } = require('./validations/validateProductList');

const insert = async (productList) => {
  const newSaleError = validateNewSale(productList);
  if (newSaleError) return newSaleError;

  const productListError = await validateProductList(productList);
  if (productListError) return productListError;

  const newSaleId = await saleProductModel.insert(productList);

  const newSale = {
    id: newSaleId,
    itemsSold: productList,
  };

  return { type: null, message: newSale };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error) return error;

  const sale = await saleProductModel.findById(id);

  if (sale.length === 0) { return { type: 'SALE_NOT_FOUND', message: 'Sale not found' }; }
  return { type: null, message: sale };
};

const getAll = async () => {
  const saleList = await saleProductModel.getAll();
  return { type: null, message: saleList };
};

const remove = async (id) => {
  const error = await findById(id);
  if (error.type) return error;

  await saleProductModel.remove(id);
  return { type: null, message: '' };
};

const update = async (updatedSale, saleId) => {
  await saleProductModel.update(updatedSale, saleId);

  const result = {
    saleId,
    itemsUpdated: updatedSale,
  };
  
  return { type: null, message: result };
};

module.exports = {
  insert,
  findById,
  getAll,
  remove,
  update,
};
