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

module.exports = { insert };