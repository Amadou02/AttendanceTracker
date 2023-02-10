'use strict';
const { QueryInterface, DataTypes } = require('sequelize');
const { Attendance } = require('./../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} DataTypes
   */
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('excuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      attendanceId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'attendances',
          key: 'id'
        }
      },
      excuseReason: {
        type: DataTypes.STRING,
        allowNull: false
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
    await queryInterface.dropTable('excuses');
  },
};
