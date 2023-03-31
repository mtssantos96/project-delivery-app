const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const authController = require('../controller/auth.controller');

const router = Router();

router.post('/', authMiddleware.validate, (req, res) => authController.validate(req, res));

module.exports = router;
