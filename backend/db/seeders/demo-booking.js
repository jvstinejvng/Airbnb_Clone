'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date('2022-11-04'),
        endDate: new Date('2022-11-06')
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date('2022-11-14'),
        endDate: new Date('2022-11-16')
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date('2022-11-19'),
        endDate: new Date('2022-11-21')
      },
      {
        userId: 4,
        spotId: 4,
        startDate: new Date('2022-11-21'),
        endDate: new Date('2022-11-22')
      },
      {
        userId: 5,
        spotId: 5,
        startDate: new Date('2022-11-26'),
        endDate: new Date('2022-11-28')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      startDate: { [Op.in]: [
        new Date('2022-11-04'), 
        new Date('2022-11-14'), 
        new Date('2022-11-19'),
        new Date('2022-11-21'),
        new Date('2022-11-26')] }
    }, {});
  }
};