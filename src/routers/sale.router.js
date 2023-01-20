const express = require('express');
const { saleProductController } = require('../controllers');

const router = express.Router();

router.post('/', saleProductController.insert);
router.get('/', saleProductController.getAll);
router.get('/:id', saleProductController.findById);

module.exports = router;
