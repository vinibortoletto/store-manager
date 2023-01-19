const { saleProductService } = require('../services');
const httpStatus = require('../utils/httpStatus');

const insert = async (req, res) => {
  const { type, message } = await saleProductService.insert(req.body);
  res.status(httpStatus.OK).json(message);
};

module.exports = { insert };