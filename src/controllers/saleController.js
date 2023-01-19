const { saleService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const insert = async (req, res) => {
  const productList = await saleService.insert(req.body);
  res.status(httpStatus.OK).json(productList);
};

module.exports = { insert };