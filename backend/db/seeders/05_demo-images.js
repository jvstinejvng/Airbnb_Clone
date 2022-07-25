'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80',
        reviewId: 1,
        spotId: 1,
        imageableId: 1,
        imageableType: "Spot"
      },
      {
        url: 'https://cdn.britannica.com/91/181391-050-1DA18304/cat-toes-paw-number-paws-tiger-tabby.jpg?q=60',
        reviewId: 2,
        spotId: 2,
        imageableId: 1,
        imageableType: "Spot"
      },
      {
        url: 'https://i5.walmartimages.com/asr/c8352799-1de6-4dd3-8389-3802749b6f41_1.bc3c206554e72b1dfdb6196ca1470aea.jpeg',
        reviewId: 2,
        spotId: 2,
        imageableId: 1,
        imageableType: "Review"
      },
      {
        url: 'https://ae01.alicdn.com/kf/H8fb483aa3a364ff39a5ccb113554214eU.jpg',
        reviewId: 3,
        spotId: 3,
        imageableId: 3,
        imageableType: "Spot"
      },
      {
        url: 'https://ae01.alicdn.com/kf/H520c4a0f46ac4f89b7e6d7bdf9f401feq/Pets-Bingo-Bird-Iron-Cages-Parrot-House-Canary-Birdcage-Outdoor-Macaw-Cockatoo-Parakeet-Conure-Finch-Travel.jpg',
        reviewId: 1,
        spotId: 1,
        imageableId: 2,
        imageableType: "Review"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] },
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};