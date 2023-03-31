const { User } = require('../database/models');

const getAll = async () => {
  const result = await User.findAll({
    where: {
      role: 'seller',
    },
    attributes: { exclude: ['password'] },
  });

  return result;
};

module.exports = {
  getAll,
};
