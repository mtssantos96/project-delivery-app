const { z } = require('zod');
const orderService = require('../service/order.service');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAll = async (req, res) => {
  const isSeller = req.user.role === 'seller';
  const { id } = req.user;

  const products = await orderService.getAll(id, isSeller);

  return res.status(200).json(products);
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getOrderById = async (req, res) => {
  const products = await orderService.getOrderById(req.params.id);

  return res.status(200).json(products);
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const setStatus = async (req, res) => {
  const id = Number(req.params.id);
  const { role, id: userId } = req.user;
  const isSeller = role === 'seller';

  const statusSchema = z.object({
    status: z.enum(
      role === 'seller'
        ? ['Preparando', 'Em Trânsito']
        : ['Entregue'],
    ),
  });

  const verify = statusSchema.safeParse(req.body);

  if (verify.success) {
    await orderService.setStatus(id, userId, verify.data.status, isSeller);
  
    return res.status(201).json(await orderService.getOrderById(id));
  }

  return res.status(400).json(verify.error.issues);
};

const orderController = {
  getAll,
  getOrderById,
  setStatus,
};

module.exports = orderController;