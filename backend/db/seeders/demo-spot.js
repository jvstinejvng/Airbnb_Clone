"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert("Spots", [
      {
        ownerId: 1,
        address: "763 48th Ave",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.773970,
        lng: -122.509300,
        name: "Dog's Beachside Dream",
        description: "A dog's haven: long walks on the beach and lots of games of frisbee",
        price: 200,
        previewImage: "https://www.theinertia.com/wp-content/uploads/2014/10/dog-beach.jpg",
      },
      {
        ownerId: 2,
        address: "39 4th St",
        city: "Oakland",
        state: "California",
        country: "United States",
        lat: 37.793250,
        lng: -122.265160,
        name: "Wag City",
        description: "A full service dog & cat care featuring boarding, training, spa services and doggy daycare",
        price: 40,
        previewImage: "https://www.eastbaytimes.com/wp-content/uploads/2016/08/20160708__SJM-WAG-0708-021.jpg?w=620",
      },
      {
        ownerId: 3,
        address: "2211 Mission Street,",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.761572,
        lng: -122.41908,
        name: "Cat's Cradle",
        description: "The cat's meow",
        price: 198,
        previewImage: "https://i.pinimg.com/564x/43/63/c5/4363c58b3bf8ff6e0f7c9cd871ca49a2.jpg",
      },
      {
        ownerId: 4,
        address: "2674 16th Ave",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.7387543223524,
        lng: -122.47170699615396,
        name: "Alice in Wonderland",
        description: "Most magical for your bunny friends",
        price: 320,
        previewImage:"https://static.wikia.nocookie.net/disney/images/0/0f/Profile_-_White_Rabbit.jpeg/revision/latest?cb=20190314055534",
      },
      {
        ownerId: 5,
        address: "8675 Wren Cir",
        city: "Elk Grove",
        state: "California",
        country: "United States",
        lat: 38.4219858031919,
        lng:  -121.38199878301816,
        name: "We speicalize in birds",
        description: "It's going to be a fly time",
        price: 332,
        previewImage: "https://vetstreet-brightspot.s3.amazonaws.com/cf/f1/b80dd1b74691907e91e59a700fa2/Parrot-Thinkstock-92674758-335lc101813.jpg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Spots", {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    });
  },
};
