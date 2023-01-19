const { saleModel } = require('../models');

const insert = async (newSaleProductList) => {
  const insertedSale = await saleModel.insert(newSaleProductList);
  return { type: null, message: insertedSale };
};

module.exports = { insert };