'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Teams', 'name', {
      allowNull: false,
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Teams', 'klasse', {
      allowNull: false,
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Teams', 'name', {
      allowNull: true,
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Teams', 'klasse', {
      allowNull: true,
      type: Sequelize.STRING
    });
  }
};