const jwt = require('jsonwebtoken');
const authService = require('../service/auth.service');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const login = async (req, res) => {
  const user = req.body;
  const response = await authService.login(user);

  const { email, role, name } = response;

  if (response === 404) {
    return res.status(404).json({ message: 'Usuário ou senha incorretos' });
  }

  const token = jwt.sign(
    response, 'secret_key',
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );

  return res.status(200).json({ token, role, email, name });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const register = async (req, res) => {
  const user = req.body;
  const response = await authService.register(user);

  if (response === 409) {
    return res.status(409).json({ message: 'Nome ou email já existentes' });
  }

  const token = jwt.sign(
    response, 'secret_key',
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );

  return res.status(201).json({ token, ...response });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const validate = async (req, res) => {
  const { user } = req;

  return res.status(200).json(user);
};

const authController = {
  login,
  register,
  validate,
};

module.exports = authController;