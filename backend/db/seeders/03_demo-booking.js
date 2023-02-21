'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-07-04',
        endDate: '2022-07-07'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-08-01',
        endDate: '2022-08-03'
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2022-08-06',
        endDate: '2022-08-12'
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2022-08-18',
        endDate: '2022-08-22'
      },
      {
        spotId: 5,
        userId: 6,
        startDate: '2022-08-28',
        endDate: '2022-08-31'
      },
      {
        spotId: 6,
        userId: 5,
        startDate: '2022-08-31',
        endDate: '2022-09-01'
      },
      {
        spotId: 7,
        userId: 8,
        startDate: '2022-09-04',
        endDate: '2022-09-07'
      },
      {
        spotId: 8,
        userId: 7,
        startDate: '2022-09-12',
        endDate: '2022-09-17'
      },
      {
        spotId: 9,
        userId: 10,
        startDate: '2022-09-04',
        endDate: '2022-09-07'
      },
      {
        spotId: 10,
        userId: 9,
        startDate: '2022-10-04',
        endDate: '2022-10-07'
      },
      {
        spotId: 1,
        userId: 10,
        startDate: '2022-10-04',
        endDate: '2022-10-07'
      },
      {
        spotId: 2,
        userId: 9,
        startDate: '2022-10-04',
        endDate: '2022-10-07'
      },
      {
        spotId: 3,
        userId: 8,
        startDate: '2022-10-04',
        endDate: '2022-10-07'
      },
      {
        spotId: 4,
        userId: 7,
        startDate: '2022-12-04',
        endDate: '2022-12-07'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
