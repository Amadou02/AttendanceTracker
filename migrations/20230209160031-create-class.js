'use strict';
/** @type {import('sequelize-cli').Migration} */
const { QueryInterface, DataTypes } = require('sequelize');
module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} DataTypes
   */
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('school_classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schoolYear: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable('school_classes');
  },
};