'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
  
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'Demo',
        email: 'demo@demo.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charliebrown@peanuts.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Tom',
        lastName: 'Jerry',
        email: 'tomcat@warnerbrothers.com',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Shaggy',
        lastName: 'Rogers',
        email: 'shaggyandscoob@scoobydoo.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Cat',
        lastName: 'Hat',
        email: 'catinthehat@seuss.com',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Stuart',
        lastName: 'Little',
        email: 'littlefamily@columbia.com',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Peter',
        lastName: 'Rabbit',
        email: 'petterrabbit@sony.com',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Jonathan',
        lastName: 'Arbuckle',
        email: 'garfieldworl@paramount.com',
        hashedPassword: bcrypt.hashSync('password8')
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      firstName: { [Op.in]: ['Demo', 'Charle', 'Tom', 'Shaggu', 'Cat', 'Stuart', 'Peter', 'Jonathan' ] }
    }, {});
  }
};
