'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 4,
        spotId: 1,
        review: 'Jenny was very communicative while we traveled, regularly giving us email updates and photos',
        stars: 4,
      },
      {
        userId: 8,
        spotId: 2,
        review: 'The care was great! When I went out of town for a week, I had my kitten stay there with no problems at all!!',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Great service & great family to work with! Highly recommend this place.',
        stars: 4,
      },
      {
        userId: 1,
        spotId: 3,
        review: "I am so happy South Paw exist. You get to frequent updates and don't feel guilty going on vacation.",
        stars: 4,
      },
      {
        userId: 5,
        spotId: 3,
        review: "Disappointed about my pariot's recent stay. Was not aware the host has pet penguins.",
        stars: 2
      },
      {
        userId: 7,
        spotId: 4,
        review: "If I could give Jon 10 stars, I would. I boarded my two cats here three times now.",
        stars: 5,
      },
      {
        userId: 6,
        spotId: 4,
        review: "An incredible home and host!My cat, Finnely easily got along with the host's cat, Garfield and dog, Oldie.",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 5,
        review: 'No hocus pocus here, the Sanderson sisters will take care of your kitties as if they were their own. ',
        stars: 5,
      },
      {
        userId: 5,
        spotId: 6,
        review: 'This place is a true community for the animals.',
        stars: 4,
      },
      {
        userId: 4,
        spotId: 7,
        review: "Great place to board your fur friends; there's plenty of space for your pet to play and relax.",
        stars: 5,
      },
      {
        userId: 8,
        spotId: 8,
        review: 'Our husky, Marty, loves stay here when we are away. ',
        stars: 5,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
