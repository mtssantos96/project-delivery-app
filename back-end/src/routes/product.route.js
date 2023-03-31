const { Router } = require('express');
const productController = require('../controller/product.controller');

const router = Router();

router.get('/', (req, res) => productController.getAll(req, res));

module.exports = router;
