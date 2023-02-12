'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'school_classes',
      [
        {
          name: 'Bachelor',
          level: 1,
          schoolYear: '2022-2023',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bachelor WAD',
          level: 2,
          schoolYear: '2022-2023',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bachelor DM',
          level: 2,
          schoolYear: '2022-2023',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bachelor WAD',
          level: 3,
          schoolYear: '2022-2023',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Bachelor DM',
          level: 3,
          schoolYear: '2022-2023',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
    const [results, metadata] = await queryInterface.sequelize.query('SELECT * FROM `school_classes`');

    await queryInterface.bulkInsert(
      'students',
      [
        {
          firstname: 'John',
          lastname: 'DOE',
          schoolClassId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: 'Jane',
          lastname: 'KING',
          schoolClassId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('school_classes', null, {});
  },
};
