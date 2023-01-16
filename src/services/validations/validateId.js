const { idSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return 'Product not found';
};

module.exports = { validateId };