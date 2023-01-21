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

const update = async ({ name }, id) => {
  const query = `
    UPDATE products
    SET name = ?
    WHERE id = ?;
  `;

  const [{ affectedRows }] = await connection.execute(query, [name, id]);

  return affectedRows;
};

const remove = async (id) => {
  const query = `
    DELETE FROM products
    WHERE id = ?; 
  `;

  const [{ affectedRows }] = await connection.execute(query, [id]); 
  return affectedRows;
};

module.exports = { getAll, findById, insert, update, remove };
