'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Justine',
        lastName: 'Jang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Jean',
        lastName: 'Pong',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Jessica',
        lastName: 'Hannha',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'winnie@gmail.com',
        username: 'Yadi',
        firstName: 'Marisa',
        lastName: 'Miche',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'lemons@gmail.com',
        username: 'orange',
        firstName: 'you',
        lastName: 'glad',
        hashedPassword: bcrypt.hashSync('password5')
      },
     ], {});
  },

  async down (queryInterface, Sequelize) {
  
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'Yadi','orange'] }
    }, {});
  }
};
