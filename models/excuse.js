'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Excuse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Excuse.init(
    {
      attendanceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      excuseReason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Excuse',
      tableName: 'excuses',
    }
  );
  return Excuse;
};
