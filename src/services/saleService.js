const { saleModel } = require('../models');

const insert = async (newSale) => {
  const insertedSaleId = await saleModel.insert(newSale);
  const insertedSale = await saleModel.findById(insertedSaleId);

  return { type: null, message: insertedSale };
};

module.exports = { insert };