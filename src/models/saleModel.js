const connection = require('../../connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
);

  return insertId;
};

module.exports = { insert };