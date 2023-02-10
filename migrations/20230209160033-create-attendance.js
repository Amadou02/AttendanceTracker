'use strict';
const { QueryInterface, DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} DataTypes
   */
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      halfDay: {
        type: DataTypes.ENUM,
        values: ['matin', 'soir'],
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['present', 'absent', 'retard'],
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('attendances');
  },
};