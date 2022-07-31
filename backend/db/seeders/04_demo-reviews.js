'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 3,
        spotId: 1,
        review: 'Words CANNOT capture my gratitude for Woofingham Palace. The entire family is absolutely incredible. Truly, one-of-a-kind place.',
        stars: parseInt(5),
      },
      {
        userId: 4,
        spotId: 1,
        review: 'Jenny gave us a tour of their home before we booked, were super friendly at every step of the way, and were very helpful and communicative while we traveled, regularly giving us email updates and photos. My little dog loved their dog, too!',
        stars: parseInt(4),
      },
      {
        userId: 8,
        spotId: 2,
        review: 'The care was great! When I went out of town for a week, I had my kitten stay there with no problems at all!!',
        stars: parseInt(5),
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Great service & great family to work with! Highly recommend this place.',
        stars: parseInt(4),
      },
      {
        userId: 1,
        spotId: 3,
        review: "As a snake owner, I am so happy South Paw exist. You get to frequent updates and don't feel guilty going on vacation.",
        stars: parseInt(4),
      },
      {
        userId: 5,
        spotId: 3,
        review: "Disappointed about my pariot's recent stay. Was not aware the host has pet penguins.",
        stars: parseInt(2),
      },
      {
        userId: 7,
        spotId: 4,
        review: "If I could give Jon 10 stars, I would. I boarded my two cats here three times now, and it's been a dream each time.",
        stars: parseInt(5),
      },
      {
        userId: 6,
        spotId: 4,
        review: "An incredible home and host! At first I was hesitant because my cat, Finnley is very timid when it comes to interacting with other animals. In my happy suprise, Finnely easily got along with the host's cat, Garfield and dog, Oldie. I could tell Finnely felt safe and welcomed here.",
        stars: parseInt(5),
      },
      {
        userId: 3,
        spotId: 5,
        review: 'No hocus pocus here, the Sanderson sisters will take care of your kitties as if they were their own. ',
        stars: parseInt(4),
      },
      {
        userId: 5,
        spotId: 6,
        review: 'This place is a true community for the animals.',
        stars: parseInt(4),
      },
      {
        userId: 4,
        spotId: 7,
        review: "This is such a great place to board your fur friends; there's plenty of space for your pet to play, climb, and relax. I would highly recommend this place to all pet owners!",
        stars: parseInt(5),
      },
      {
        userId: 8,
        spotId: 8,
        review: 'Our husky, Marty, loves stay here when we are away. ',
        stars: parseInt(4),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Reviews', {}, {});
  }
};
