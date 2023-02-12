'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student, Excuse }) {
      // define association here
      this.belongsTo(Student, { foreignKey: 'studentId' });
      this.hasOne(Excuse, { foreignKey: 'attendanceId' });
    }
  }
  Attendance.init(
    {
      // studentId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
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
    },
    {
      sequelize,
      modelName: 'Attendance',
      tableName: 'attendances',
    }
  );
  return Attendance;
};
