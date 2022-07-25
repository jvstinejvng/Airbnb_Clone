'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date('2022-11-14'),
        endDate: new Date('2022-11-20')
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date('2022-7-09'),
        endDate: new Date('2022-7-12')
      },
      {
        userId: 3,
        spotId: 3,
        startDate: new Date('2022-8-19'),
        endDate: new Date('2022-8-21')
      },
      {
        userId: 4,
        spotId: 4,
        startDate: new Date('2022-3-21'),
        endDate: new Date('2022-3-22')
      },
      {
        userId: 5,
        spotId: 5,
        startDate: new Date('2022-7-06'),
        endDate: new Date('2022-7-12')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      startDate: { [Op.in]: [
        new Date('2022-11-14'), 
        new Date('2022-7-09'), 
        new Date('2022-8-19'),
        new Date('2022-3-21'),
        new Date('2022-7-06')] }
    }, {});
  }
};