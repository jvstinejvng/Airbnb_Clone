'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2022-07-30'),
        endDate: new Date('2022-08-05'),
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2022-08-15'),
        endDate: new Date('2022-08-18'),
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2022-09-02'),
        endDate: new Date('2022-09-10'),
      },
      {
        spotId: 4,
        userId: 4,
        startDate: new Date('2023-01-14'),
        endDate: new Date('2023-01-16'),
      },
      {
        spotId: 5,
        userId: 5,
        startDate: new Date('2022-11-02'),
        endDate: new Date('2022-11-05'),
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date('2022-12-21'),
        endDate: new Date('2023-01-03'),
      },
      {
        spotId: 7,
        userId: 3,
        startDate: new Date('2022-09-21'),
        endDate: new Date('2022-09-25'),
      },
      {
        spotId: 8,
        userId: 2,
        startDate: new Date('2022-10-07'),
        endDate: new Date('2022-10-10'),
      },
      {
        spotId: 3,
        userId: 5,
        startDate: new Date('2022-10-22'),
        endDate: new Date('2022-10-28'),
      },
      {
        spotId: 7,
        userId: 2,
        startDate: new Date('2022-11-11'),
        endDate: new Date('2022-10-20'),
      },
      {
        spotId: 4,
        userId: 3,
        startDate: new Date('2021-11-09'),
        endDate: new Date('2021-11-12'),
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date('2022-11-14'),
        endDate: new Date('2022-11-16'),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Bookings', {}, {});
  }
};