'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        review: 'Huge beautiful backyard, great for larger dogs!',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Happy my cat had a clean place to stay while I was away.',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        spotId: 3,
        review: 'My dog has fleas a week after, YUCK',
        stars: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        spotId: 4,
        review: 'Great place for curious cats',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        spotId: 5,
        review: 'Homeowners went above and beyond',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      userId: { [Op.in]: [1, 2, 3, 4, 5] },
    }, {});
  }
};