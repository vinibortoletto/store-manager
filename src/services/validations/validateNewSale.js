const { newSaleSchema } = require('./schema');

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);
  const { productId, quantity } = newSale[0];

  const hasProductId = productId !== undefined; 
  const hasQuantity = quantity !== undefined;

  const type = (!hasProductId || !hasQuantity) ? 'VALUE_REQUIRED' : 'INVALID_VALUE';

  if (error) {
    return {
      type,
      message: error.message.split('[0].').join(''),
    };
  }
};

module.exports = { validateNewSale };