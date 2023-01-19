const { saleProductModel } = require('../models');

const insert = async (productList) => {
  const newSaleId = await saleProductModel.insert(productList);
  const newSale = await saleProductModel.findById(newSaleId);
  return { type: null, message: newSale };
};

const findById = async (id) => {
  const sale = await saleProductModel.findById(id);
  return { type: null, message: sale };  
};

module.exports = { insert, findById };