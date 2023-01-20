const { newSaleSchema } = require('./schema');

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);
  const hasQuantity = newSale[0].quantity;

  if (error) {
    return {
      type: !hasQuantity ? 'INVALID_VALUE' : 'REQUIRED_VALUE',
      message: error.message.split('[0].').join(''),
    };
  }
};

module.exports = { validateNewSale };