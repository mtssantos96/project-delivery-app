const productService = require('../service/product.service');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAll = async (_req, res) => {
  const products = await productService.getAll();

  return res.status(200).json(products);
};

const productController = {
  getAll,
};

module.exports = productController;