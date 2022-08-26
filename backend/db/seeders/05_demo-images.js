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
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/97/1c/e7/971ce7628b56bbe8c548d1c4223be5a2.jpg",
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/5a/f5/fe/5af5fe73f3edcf79db584ccc54ee05f0.jpg",
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/8a/50/29/8a50295030a9b107dc5098b435eb83a4.jpg",
      },
      {
        spotId: 1,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/03/ec/ee/03ecee47558503a1afbefb798659b911.jpg",
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url:"https://i.pinimg.com/564x/de/6e/75/de6e7593b90e2ddbd79834ee5ee12945.jpg",
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/62/75/7f/62757f20073fdbbe18353b67cf96a2bf.jpg",
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: "https://www.hayneedle.com/tips-and-ideas/wp-content/uploads/2013/09/dog-run-with-hammock-800x533.jpg",
      },
      {
        spotId: 2,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/9f/fe/87/9ffe879860cf9dd294708c54a00105b9.jpg",
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/e4/af/9d/e4af9dfa8b996a9353be615415eb38de.jpg",
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/3c/1c/f8/3c1cf81e2cd5e865463c744d63c7a2ab.jpg",
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: "https://i.pinimg.com/564x/3e/5a/54/3e5a5451adfbb63b4a5b1136a53f5934.jpg",
      },
      {
        spotId: 3,
        imageableType: 'Spot',
        url: "",
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
