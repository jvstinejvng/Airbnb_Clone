'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 1
      },
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/0653595a-30bd-43d2-978e-2d3a215f84e9.jpg',
        reviewId: null,
        spotId: 1
      },
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 1
      },

      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 2
      },
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 2
      },
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/7031a98e-45e3-45dd-abcf-8307b70c2906.jpg',
        reviewId: null,
        spotId: 2
      },

      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 3
      },
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/32904ce8-84c0-428d-852d-64e0167e7889.jpg',
        reviewId: null,
        spotId: 3
      },
      {
        url: 'https://dogtime.com/assets/uploads/2018/10/puppies-cover.jpg',
        reviewId: null,
        spotId: 3
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      reviewId: { [Op.in]: [1, 2, 3] },
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
