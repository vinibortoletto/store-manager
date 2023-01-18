const camelize = require('camelize');
const connection = require('../../connection');
const saleModel = require('./saleModel');
const {
  createColumnsAndPlaceholders,
} = require('../utils/createColumnsAndPlaceholders');

const insert = async (newSaleProductList) => {
  const newSaleId = await saleModel.insert();
  
  const { columns, placeholders } = createColumnsAndPlaceholders(newSaleProductList[0]);

  const promises = newSaleProductList.map(async (_) => (
    connection.execute(
      `INSERT INTO sales_products (sale_id, ${columns}) VALUES (?, ${placeholders})`,
    [newSaleId, ...Object.keys(newSaleProductList[0])],
    )
  ));

  await Promise.all(promises);

  return newSaleId;
};

const findById = async (id) => {
  const result = await connection.execute(
    'SELECT * FROM sales_products WHERE id = ?', [id],
  );

  return camelize(result);
};

module.exports = { insert, findById };