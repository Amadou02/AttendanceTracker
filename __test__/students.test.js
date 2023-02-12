const app = require('../app');
const request = require('supertest');

const students_seeds = require('./../constants/students_data');
const school_classes_seed = require('./../constants/school_classes_data');

const { Student, SchoolClass, sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  });

  await SchoolClass.bulkCreate(school_classes_seed);

  await Student.bulkCreate(students_seeds);
});

afterAll(async () => {
  await sequelize.close();
});

describe('Attendance API Students route', () => {
  it('it should return true', () => {
    expect(true).toBeTruthy();
  });
});
