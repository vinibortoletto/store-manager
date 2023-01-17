const httpStatus = require('./httpStatus');

const errorTypes = {
  INVALID_VALUE: httpStatus.UNPROCESSABLE_ENTITY,
  PRODUCT_NOT_FOUND: httpStatus.NOT_FOUND,
};

module.exports = { errorTypes };