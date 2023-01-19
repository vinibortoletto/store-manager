const express = require('express');
const { saleProductController } = require('../controllers');

const router = express.Router();

router.post('/', saleProductController.insert);

module.exports = router;