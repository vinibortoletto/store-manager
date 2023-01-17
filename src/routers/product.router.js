const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.findById);
router.post('/', productController.insert);

module.exports = router;