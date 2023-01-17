const { newProductSchema } = require('./schema');

const validateNewProduct = (newProduct) => {
  const { error } = newProductSchema.validate(newProduct);

  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: error.message,
    };
  }
};

module.exports = { validateNewProduct };