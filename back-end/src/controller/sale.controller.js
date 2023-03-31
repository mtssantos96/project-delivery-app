const { z } = require('zod');
const saleService = require('../service/sale.service');

const saleSchema = z.object({
  items: z.array(z.object({
    id: z.number(),
    price: z.string().regex(/^\d+(\.\d+)?$/).transform(Number),
    quantity: z.number(),
    // name: z.string(),
    // urlImage: z.string().url(),
  })).nonempty(),
  sellerId: z.number(),
  deliveryAddress: z.string(),
  deliveryNumber: z.string(),
});

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const checkout = async (req, res) => {
  const { id } = req.user;

  const sale = saleSchema.safeParse(req.body);

  if (!sale.success) {
    return res.status(400).json(sale.error);
  }

  try {
    const sales = await saleService.checkout(id, sale.data);
    return res.status(201).json(sales);
  } catch (err) {
    console.error(err);

    return res.status(400).json({ message: err.message });
  }
};

const saleController = {
  checkout,
};

module.exports = saleController;