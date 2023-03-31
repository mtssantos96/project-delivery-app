const { Router } = require('express');

const loginRouter = require('./login.router');
const registerRouter = require('./register.router');
const validateRouter = require('./validate.router');
const productRouter = require('./product.route');
const saleRouter = require('./sale.router');
const sellerRouter = require('./seller.router');
const orderRouter = require('./order.router');
const adminRouter = require('./admin.router');

const router = Router();

router.use('/', (req, res, next) => {
  console.log({
    path: req.path,
    method: req.method,
    authorization: req.headers.authorization,
  });

  next();
});

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/validate', validateRouter);

router.use('/products', productRouter);
router.use('/checkout', saleRouter);
router.use('/sellers', sellerRouter);

router.use('/orders', orderRouter);

router.use('/admin', adminRouter);

module.exports = router;
