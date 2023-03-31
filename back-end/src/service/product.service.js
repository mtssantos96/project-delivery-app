const { Product } = require('../database/models');

const getAll = async () => {
  const result = await Product.findAll();

  return result;
};

module.exports = {
  getAll,
};
