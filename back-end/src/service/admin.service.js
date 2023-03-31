const crypto = require('crypto');
const { User } = require('../database/models');

const create = async (body) => {
  const hash = crypto.createHash('md5').update(body.password).digest('hex');

  const result = await User.create({
    name: body.name,
    email: body.email,
    role: body.role,
    password: hash,
  });

  return result;
};

const admList = async () => {
  const list = await User.findAll({ attributes: { exclude: ['password'] } });
  return list;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  admList,
  deleteUser,
};
