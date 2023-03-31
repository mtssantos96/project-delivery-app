const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const saleController = require('../controller/sale.controller');

const router = Router();

router.post('/', authMiddleware.validate, (req, res) => saleController.checkout(req, res));

module.exports = router;
