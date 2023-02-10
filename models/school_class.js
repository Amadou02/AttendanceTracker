'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SchoolClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SchoolClass.init(
    {
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
    },
    {
      sequelize,
      modelName: 'SchoolClass',
      tableName: 'school_classes',
    }
  );
  return SchoolClass;
};
