const { Router } = require('express');
const orderController = require('../controller/order.controller');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.get('/', authMiddleware.validate, (req, res) => orderController.getAll(req, res));
router.get('/:id', authMiddleware.validate, (req, res) => orderController.getOrderById(req, res));
router.put(
  '/:id/status',
  authMiddleware.validate,
  (req, res) => orderController.setStatus(req, res),
  );

module.exports = router;
