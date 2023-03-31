const crypto = require('crypto');
const { Op } = require('sequelize');
const { User } = require('../database/models');

const login = async (user) => {
  const result = await User.findOne({
    where: {
      email: user.email,
    },
  });

  const hash = crypto.createHash('md5').update(user.password).digest('hex');

  if (!result || hash !== result.dataValues.password) {
    return 404;
  }

  return {
    id: result.id,
    email: result.email,
    role: result.role,
    name: result.name,
  };
};

const register = async (user) => {
  const { name, email, password } = user;
  const result = await User.findOne({
    where: {
      [Op.or]: [{ name }, { email }],
    },
  });

  if (result) {
    return 409;
  }

  const hash = crypto.createHash('md5').update(password).digest('hex');

  const newUser = await User.create({ name, email, password: hash, role: 'customer' });

  return {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    name: newUser.name,
  };
};

const authService = {
  login,
  register,
};

module.exports = authService;
