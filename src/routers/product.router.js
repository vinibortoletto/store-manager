const express = require('express');
const { productController } = require('../controllers');
const { validateName } = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.findById);
router.post('/', validateName, productController.insert);

module.exports = router;