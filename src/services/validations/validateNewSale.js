const { newSaleSchema } = require('./schema');

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);

  if (error) {
    return {
      type: 'VALUE_REQUIRED',
      message: error.message.split('[0].').join(''),
    };
  }
};

module.exports = { validateNewSale };