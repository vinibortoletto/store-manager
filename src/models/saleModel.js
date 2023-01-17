const connection = require('../../connection');
const {
  createColumnsAndPlaceholders,
} = require('../utils/createColumnsAndPlaceholders');

const insert = async (newSale) => {
  const { columns, placeholders } = createColumnsAndPlaceholders(newSale);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUES (${placeholders})`,
    [...Object.values(newSale)],
  );

  return insertId;
};

module.exports = { insert };