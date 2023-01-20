const { saleProductModel } = require('../models');
const { validateNewSale } = require('./validations/validateNewSale');
const { validateProductList } = require('./validations/validateProductList');

const insert = async (productList) => {
  const newSaleError = validateNewSale(productList);
  if (newSaleError) return newSaleError;
 
  const productListError = await validateProductList(productList);
  if (productListError) return productListError;

  const newSaleId = await saleProductModel.insert(productList);
  const newSaleProductList = await saleProductModel.findById(newSaleId);

  const newSale = {
    id: newSaleId,
    itemsSold: newSaleProductList.map(({ productId, quantity }) => ({
      productId,
      quantity,
    })),
  };

  return { type: null, message: newSale };
};

const findById = async (id) => {
  const sale = await saleProductModel.findById(id);
  return { type: null, message: sale };
};

module.exports = { insert, findById };
