const { Sale, Product, User } = require('../database/models');

/**
 * @param {number} id
 * @param {boolean} isSeller
 */
const getAll = async (id, isSeller) => {
  const result = await Sale.findAll({
    where: isSeller 
    ? {
      sellerId: id,
    }
    : {
      userId: id,
    },
    attributes: isSeller
      ? ['id', 'status', 'totalPrice', 'saleDate', 'deliveryAddress', 'deliveryNumber']
      : ['id', 'status', 'totalPrice', 'saleDate'],
  });

  return result;
};

/**
 * @param {number} id
 */
const getOrderById = async (id) => {
  const result = await Sale.findOne({
    where: { id },
    attributes: { exclude: ['userId', 'sellerId', 'user_id', 'seller_id'] },
    include: [
      { model: Product, as: 'products' },
      {
        model: User,
        as: 'customer',
        attributes: { exclude: ['password', 'email', 'role'] },
      },
      {
        model: User,
        as: 'seller',
        attributes: { exclude: ['password', 'email', 'role'] },
      },
    ],
  });

  return result;
};

/**
 * @param {number} id
 * @param {number} userId
 * @param {"Preparando" | "Em Trânsito" | "Entregue"} status
 * @param {boolean} isSeller
 */
const setStatus = async (id, userId, status, isSeller) => {
  const result = await Sale.update({
    status,
  }, {
    where: isSeller 
    ? {
      id,
      sellerId: userId,
    }
    : {
      id,
      userId,
    },
  });

  return result;
};

module.exports = {
  getAll,
  getOrderById,
  setStatus,
};
