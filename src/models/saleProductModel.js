const camelize = require('camelize');
const saleModel = require('./saleModel');
const connection = require('../../connection');
const { createColumnsAndPlaceholders } = require('../utils/createColumnsAndPlaceholders');

const findById = async (id) => {
  const query = 'SELECT * FROM sales_products WHERE sale_id = ?';
  const [sale] = await connection.execute(query, [id]);
  return camelize(sale);
};

const insert = async (productList) => {
  const newSaleId = await saleModel.insert();

  const { columns, placeholders } = createColumnsAndPlaceholders(productList[0]);
  
  const query = `INSERT INTO sales_products (sale_id, ${columns}) VALUES(?, ${placeholders})`;

  const promises = productList.map(async (product) => (
    connection.execute(query, [newSaleId, ...Object.values(product)])
  ));
  
  await Promise.all(promises);

  return newSaleId;
};

module.exports = { insert, findById };