const connection = require('../../connection');
const {
  createColumnsAndPlaceholders,
} = require('../utils/createColumnsAndPlaceholders');

const insert = async (newSaleDate) => {
  const { columns, placeholders } = createColumnsAndPlaceholders(newSaleDate);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales (${columns}) VALUES (${placeholders})`,
    [...Object.values(newSaleDate)],
  );

  return insertId;
};

module.exports = { insert };