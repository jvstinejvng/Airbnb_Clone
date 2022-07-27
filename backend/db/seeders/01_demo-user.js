'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Justine',
        lastName: 'Jang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: 'Jean',
        lastName: 'Pong',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: 'Jessica',
        lastName: 'Hannha',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'winnie@gmail.com',
        firstName: 'Marisa',
        lastName: 'Miche',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'lemons@gmail.com',
        firstName: 'Yadi',
        lastName: 'glad',
        hashedPassword: bcrypt.hashSync('password5')
      },
     ], {});
  },

  async down (queryInterface, Sequelize) {
  
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      firstName: { [Op.in]: ['Justine', 'Jean', 'Jessica', 'Marisa','Yadi'] }
    }, {});
  }
};
