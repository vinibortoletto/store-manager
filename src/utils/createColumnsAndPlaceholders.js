const createColumnsAndPlaceholders = (object) => {
  const columns = Object.keys(object).join(', ');
  const placeholders = Object.keys(object).map(() => '?').join(', ');
  return { columns, placeholders };
};

module.exports = { createColumnsAndPlaceholders };