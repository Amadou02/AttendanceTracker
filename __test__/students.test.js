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

  describe('GET /students/:id', () => {
    it('should return a 200 status code', async () => {
      const res = await request(app).get('/students/1');
      expect(res.statusCode).toBe(200);
    });

    it('should return a student with id 1', async () => {
      const res = await request(app).get('/students/1');

      expect(res.body).toHaveProperty('firstname', 'John');
      expect(res.body).toHaveProperty('lastname', 'DOE');
    });
  });

  describe('POST /students', () => {
    it('should create a new student', async () => {
      const currentDate = new Date();
      const fullYear = currentDate.getFullYear();
      const month =
        currentDate.getMonth() + 1 < 10
          ? `0${currentDate.getMonth() + 1}`
          : currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const res = await request(app).post('/students').send({
        firstname: 'Antoine',
        lastname: 'DUPONT',
        schoolClassId: 3,
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('firstname', 'Antoine');
      expect(res.body).toHaveProperty('lastname', 'DUPONT');
      expect(res.body).toHaveProperty('schoolClassId', 3);

      expect(res.body.createdAt).toContain(`${fullYear}-${month}-${day}`);
    });
  });

  describe('PATCH /students/:id', () => {
    it('should update an existing student', async () => {
      const res = await request(app).patch('/students/3').send({
        firstname: 'François',
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        'message',
        'Student updated successfully!'
      );
    });

    it('should return error message for update req with bad id', async () => {
      const res = await request(app).patch('/students/100').send({
        firstname: 'François',
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        'message',
        'No student found for the entered ID!'
      );
    });
  });

  describe('DELETE /students/:id', () => {
    it('should delete an existing students', async () => {
      const res = await request(app).delete('/students/3');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty(
        'message',
        'Student deleted successfully!'
      );
    });

     it('should return error message for update req with bad id', async () => {
        const res = await request(app).delete('/students/3');
        expect(res.statusCode).toEqual(404);
       expect(res.body).toHaveProperty(
         'message',
         'No student found for the entered ID!'
       );
     });
  });

  describe('Test non-existent route', () => {
    it('return 404 error', async () => {
        const res = await request(app).put('/students/:id')
        expect(res.statusCode).toBe(404);
    })
  })
});
