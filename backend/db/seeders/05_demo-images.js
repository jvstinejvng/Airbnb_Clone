'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
  
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/323b2430-a7fa-44d7-ba7a-6776d8e682df.jpg?im_w=1200',
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/4d15097b-4112-47ea-9d6a-90a08cc04035.jpg?im_w=1440',
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/b040e61a-97da-4815-8b6c-11d7be7db1f9.jpeg?im_w=1440',
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/19e82eb8-4125-461c-b832-a45b5482fbdf.jpeg?im_w=1440',
      },
      {
        reviewId: 1,
        imageableType: 'Review',
        url: 'https://a0.muscache.com/im/pictures/073f3f02-503b-4135-a138-dc0fca5af6d7.jpg?im_w=1200',
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/8796ca9b-fec7-429b-b94c-cb39213f90e8.jpg?im_w=1200',
      },
      {
        reviewId: 4,
        imageableType: 'Review',
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-45054521/original/5c16d2f4-c020-4126-8899-fdf39cf38385.jpeg?im_w=1200',
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/7deb6397-c3d1-4a07-a1f1-72731ef72065.jpg?im_w=1200',
      },
      {
        spotId: 4,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/d3f77c1a-c1aa-4adc-bdc1-85ee32eb291d.jpg?im_w=960',
      },
      {
        spotId: 6,
        imageableType: 'Spot',
        url: 'https://a0.muscache.com/im/pictures/177b3fb2-7d2b-4b51-be71-296883713596.jpg?im_w=960',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Images', {}, {});
  }
};
