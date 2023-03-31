const { Sale, SaleProduct, sequelize } = require('../database/models');

const createSale = async (t, id, { sellerId, items, deliveryAddress, deliveryNumber }) => (
  Sale.create({
    userId: id,
    sellerId,
    totalPrice: items.reduce(((acc, { price, quantity }) => (
      price * quantity) + acc
    ), 0),
    deliveryAddress,
    deliveryNumber,
    saleDate: (new Date()).toUTCString(),
    status: 'Pendente',
  }, { transaction: t })
);

const checkout = async (userId, sale) => {
  const t = await sequelize.transaction();
  try {
    const result = await createSale(t, userId, sale);

    await Promise.all(sale.items.map((item) => (
      SaleProduct.create({
        saleId: result.id,
        productId: item.id,
        quantity: item.quantity,
      }, { transaction: t })
    )));

    await t.commit();

    return result;
  } catch (err) {
    await t.rollback();
    
    console.error(err);

    throw new Error('Parâmetros inválidos');
  }
};

module.exports = {
  checkout,
};
