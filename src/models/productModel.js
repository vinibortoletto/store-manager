const connection = require('../../connection');
const { createColumnsAndPlaceholders } = require('../utils/createColumnsAndPlaceholders');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  return product;
};

const insert = async (newProduct) => {
  const { columns, placeholders } = createColumnsAndPlaceholders(newProduct);

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUES (${placeholders})`, [newProduct.name],
  );

  return insertId;
};

module.exports = { getAll, findById, insert };
