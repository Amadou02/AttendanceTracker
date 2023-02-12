'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({SchoolClass, Attendance}) {
      // define association here
      this.hasMany(Attendance, { foreignKey: 'studentId' });
      this.belongsTo(SchoolClass, { foreignKey: 'schoolClassId' });
    }
  }
  Student.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students'
    }
  );
  return Student;
};