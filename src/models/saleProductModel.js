const camelize = require('camelize');
const saleModel = require('./saleModel');
const connection = require('../../connection');
const { createColumnsAndPlaceholders } = require('../utils/createColumnsAndPlaceholders');

const findById = async (id) => {
  const query = `
    SELECT 
      s.date,
      sp.product_id,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp
    ON sp.sale_id = ?
  `;
  
  const [[sale]] = await connection.execute(query, [id]);
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

const getAll = async () => {
  const query = `
    SELECT 
      sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales as s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id, sp.product_id;
  `;

  const [saleList] = await connection.execute(query);
  return camelize(saleList);
};

module.exports = { insert, findById, getAll };