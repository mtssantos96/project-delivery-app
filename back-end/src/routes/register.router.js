const { Router } = require('express');
const authController = require('../controller/auth.controller');

const router = Router();

router.post('/', (req, res) => authController.register(req, res));

module.exports = router;
