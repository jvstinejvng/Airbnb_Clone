'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 6,
        spotId: 1,
        review: 'Great communication throughout our whole trip and sent us daily email updates and photos',
        stars: 4,
      },
      {
        userId: 5,
        spotId: 2,
        review: 'I was out of town for a week, and I had my puppy stay there with no problems! Very happy with the pet care! ',
        stars: 5,
      },
      {
        userId: 4,
        spotId: 3,
        review: 'Amazing experience! I will be recommending her to other cat parents.',
        stars: 4,
      },
      {
        userId: 3,
        spotId: 4,
        review: "I am thankful Petbnb exists. You get frequent updates and don't feel guilty going on vacation.",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 5,
        review: "Wanted to like this cat care, but was disappointed by the overall service. Not worth the price!",
        stars: 2
      },
      {
        userId: 1,
        spotId: 6,
        review: "If I could give ten stars, I would. My cat didn't want to leave!",
        stars: 5,
      },
      {
        userId: 6,
        spotId: 7,
        review: "An incredible home and host! My dog, Olive, easily got along with the host's dogs.",
        stars: 4,
      },
      {
        userId: 7,
        spotId: 8,
        review: 'What a fun trio! They really do take care of your dogs as if they were their own.',
        stars: 5,
      },
      {
        userId: 8,
        spotId: 9,
        review: 'This place is a true community for the animals.',
        stars: 4,
      },
      {
        userId: 9,
        spotId: 10,
        review: "Great place to board your fur friends; there's plenty of space for your pet to play and relax.",
        stars: 5,
      },
      {
        userId: 10,
        spotId: 11,
        review: 'Our bunny, Marty, enjoys staying here when we are away. ',
        stars: 5,
      },
      {
        userId: 1,
        spotId: 11,
        review: 'Took great care of my lizard!!!!!',
        stars: 4,
      },
      {
        userId: 2,
        spotId: 11,
        review: "We've been so grateful to find a bird hotel in our city",
        stars: 4,
      },
      {
        userId: 3,
        spotId: 11,
        review: "It's a jungle in there. I didn't feel safe boarding my bunny here. Isn't there a limit to how many animals you can own? ",
        stars: 1,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
