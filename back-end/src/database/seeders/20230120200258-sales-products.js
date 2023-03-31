'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // TODO
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sales_products', null, {});
  }
};
