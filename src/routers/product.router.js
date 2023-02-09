const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.findById);
router.post('/', productController.insert);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);
router.get('/search', productController.search);

module.exports = router;
