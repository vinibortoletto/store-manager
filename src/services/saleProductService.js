const { saleProductModel } = require('../models');
const { validateNewSale } = require('./validations/validateNewSale');

const insert = async (productList) => {
  const error = validateNewSale(productList);
  if (error) return error;
  
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
