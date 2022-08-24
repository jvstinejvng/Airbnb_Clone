'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '3451 Park Pl',
        city: 'Pleasanton',
        state: 'California',
        country: 'United States of America',
        lat: 37.70884568787755,
        lng:  -121.8577699430043,
        name: 'Your Dogs will have a Pawsome Time!',
        description: "Home Away From Home Pet Boarding! Fun-filled, friendly cage-free dog boarding home loved and cared for by a family with three Kids and their labrador retriever. Our goal is to ensure your dog's stay is a wonderful experience, so they look forward to staying with me and my family time and time again. Our pets are like family to us, and in this home, your fur babies will get all the love, affection, and one-on-one attention they would get in their home.",
        price: 150,
        previewImage: 'https://i.pinimg.com/564x/a4/1e/ac/a41eacfbf05f3ed4c2fe11e9f2fa1460.jpg',
      },
      {
        ownerId: 1,
        address: '11233 Center St',
        city: 'Brookdale',
        state: 'California',
        country: 'United States of America',
        lat: 37.11989921777906,
        lng: -122.10652045878837,
        name: "Stay at Cat Lover Near the Airport",
        description: 'Accountable family-style shorterm and longterm care for cats and small animals!',
        price: 100,
        previewImage: 'https://i.pinimg.com/originals/c8/bf/e9/c8bfe93c7e87c1aa4edf0c70b02a0184.jpg',
      },
      {
        ownerId: 1,
        address: '480 Park Ave',
        city: 'New york',
        state: 'NY',
        country: 'United States of America',
        lat: 40.76284373029808,
        lng: -73.97072973743268,
        name: 'South Paw',
        description: "Professional exotic pet care for birds, reptiles, and small mammals. Just because you don't have a dog or cat doesn't mean you don't deserve a safe, secure, happy place for your pets",
        price: 559,
        previewImage: 'https://photos.realtyhop.com/p/s/990x990/17899208_8d6f2c6e9b0ba7a1dc9760ebec0de6b13f31e43e625867b5a4f517a1bc8bd41f.webp',
      },
      {
        ownerId: 2,
        address: '711 Maple Street',
        city: 'Muncie',
        state: 'IN',
        country: 'United States of America',
        lat:  34.138155650515536,
        lng: - -118.35330453927918,
        name: "Garfield and Friends ",
        description: 'Where nap-taking is priority, lasagne-lovers live and furry friendships are made.',
        price: 200,
        previewImage: 'https://photos.wikimapia.org/p/00/03/01/71/25_big.jpg',
      },
      {
        ownerId: 3,
        address: '318 Essex Street',
        city: 'Salem',
        state: 'MA',
        country: 'United States of America',
        lat: 42.52136417263659,
        lng: -70.8998585220895,
        name: "Cat's Cradle",
        description: 'Exquisit personalized boutique cat boarding. Luxury home environment exclusively for cats!',
        price: 100,
        previewImage: 'https://cdn.shopify.com/s/files/1/0464/9357/files/Screen_Shot_2019-09-17_at_11.16.45_AM_grande.png?v=1568745610',
      },
      {
        ownerId: 4,
        address: '2100 Green Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States of America',
        lat: 37.79676093700068,
        lng: -122.43393787687747,
        name: 'Furry Connections',
        description: "Hosted by the world famous animal whisper and physician, Dr.Dolittle.",
        price: 199,
        previewImage: 'https://www.compass.com/m/7074237b6a129b8b384523a2e60ff2eb2e95a273_img_0/origin.jpg',
      },
      {
        ownerId: 5,
        address: '1544 N St Andrews Pl',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 34.09910881088025,
        lng: -118.31131336626845,
        name: "Pets 'N Pals Bed and Breakfast",
        description: "A home-style place for your furry friend to play while you're away.",
        price: 199,
        previewImage: 'https://i0.wp.com/www.iamnotastalker.com/wp-content/uploads/2020/08/IMG_2141.jpg',
      },
      {
        ownerId: 5,
        address: '1405 Milan Ave',
        city: 'South Pasadena',
        state: 'CA',
        country: 'United States of America',
        lat: 34.1099315385809,
        lng: -118.14375680543434,
        name: "Wags and Walks Dog Family Home",
        description: "Large dog boarding care specializing in long and short-term stay. Your dog's home-away-from-home. No kennels! no cages!",
        price: 150,
        previewImage: 'https://filmoblivion.files.wordpress.com/2018/11/beethoven1.jpg?w=676',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Spots', {}, {});
  }
};
