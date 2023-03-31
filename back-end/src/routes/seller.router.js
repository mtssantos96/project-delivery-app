const { Router } = require('express');
// const authMiddleware = require('../middleware/auth');
const sellerController = require('../controller/seller.controller');

const router = Router();

router.get('/', (req, res) => sellerController.getAll(req, res));

module.exports = router;
