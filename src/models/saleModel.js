const camelize = require('camelize');
const connection = require('../../connection');
const { createColumnsAndPlaceholders } = require('../utils/createColumnsAndPlaceholders');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
  );
  
  return insertId;
};

const insert = async (productList) => {
  const newSaleId = await insertSale();

  const { columns, placeholders } = createColumnsAndPlaceholders(productList[0]);

  const query = `INSERT INTO sales_products (sale_id, ${columns}) VALUES (?, ${placeholders})`;

  const promises = productList.map(async () => (
    connection.execute(query, [newSaleId, ...Object.keys(productList[0])])
  ));

  await Promise.all(promises);

  return newSaleId;
};

const findById = async (id) => {
  const query = 'SELECT * FROM sales_products WHERE id = ?';
  const result = await connection.execute(query, [id]);
  return camelize(result);
};

module.exports = { insert, findById };