const { newSaleSchema } = require('./schema');

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);

  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: error.message.split('[0].').join(''),
    };
  }
};

module.exports = { validateNewSale };