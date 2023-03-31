const sellerService = require('../service/seller.service');

const getAll = async (_req, res) => {
  const sellers = await sellerService.getAll();

  return res.status(200).json(sellers);
};

const sellerController = {
  getAll,
};

module.exports = sellerController;
