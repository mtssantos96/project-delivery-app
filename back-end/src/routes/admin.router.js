const { Router } = require('express');
const adminController = require('../controller/admin.controller');
const authMiddleware = require('../middleware/auth');

const router = Router();

router.post('/user', authMiddleware.validate,
  authMiddleware.validateRole(['administrator']), (req, res) => adminController.create(req, res));

router.get('/user', authMiddleware.validate,
  authMiddleware.validateRole(['administrator']), (req, res) => adminController.admList(req, res));

router.delete('/user/:id', authMiddleware.validate,
  authMiddleware.validateRole(['administrator']),
  (req, res) => adminController.deleteUser(req, res));

module.exports = router;
