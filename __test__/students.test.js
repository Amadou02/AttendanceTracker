const app = require('../app');
const request = require('supertest');

const { Student, SchoolClass, sequelize } = require('../models');

beforeAll(async () => {
  //   await sequelize.sync({
  //     force: true,
  //   });

//   await Student.destroy({
//     truncate: true,
//   });

  const schoolClasses = await SchoolClass.findAll({});

  await Student.bulkCreate([
    {
      firstname: 'John test',
      lastname: 'DOE',
      schoolClassId: schoolClasses[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstname: 'Jane test',
      lastname: 'KING',
      schoolClassId: schoolClasses[3].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe('Attendance API Students route', () => {
  it('it should return true', () => {
    expect(true).toBeTruthy();
  });
});
