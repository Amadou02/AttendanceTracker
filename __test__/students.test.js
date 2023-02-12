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
  describe('GET /students', () => {
    it('should return a 200 status code', async () => {
      const res = await request(app).get('/students');
      expect(res.statusCode).toBe(200);
    });

    it('should return a nomber of students record', async () => {
      const res = await request(app).get('/students');
      expect(res.body).toHaveProperty('count');
      expect(res.body.count).toBe(2);
    });
  });

  it('should return correct data in db', async () => {
    const res = await request(app).get('/students');
    expect(res.body.rows[0]).toMatchObject({
      id: 1,
      firstname: 'John',
      lastname: 'DOE',
      schoolClassId: 1,
    });
    expect(res.body.rows[0].createdAt).toContain('2023-02-10T16:09:37');
    expect(res.body.rows[0].updatedAt).toContain('2023-02-10T16:09:37');

    expect(res.body.rows[1]).toMatchObject({
      id: 2,
      firstname: 'Jane',
      lastname: 'KING',
      schoolClassId: 3,
    });
    expect(res.body.rows[1].createdAt).toContain('2023-02-10T16:09:37');
    expect(res.body.rows[1].updatedAt).toContain('2023-02-10T16:09:37');
  });
});
