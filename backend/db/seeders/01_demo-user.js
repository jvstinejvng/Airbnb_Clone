'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
  
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'Demo',
        username: 'DemoUser',
        email: 'demo@demo.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        username: 'snoopy',
        email: 'charliebrown@peanuts.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Tom',
        lastName: 'Jerry',
        username: 'tomandjerry',
        email: 'tomcat@warnerbrothers.com',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Shaggy',
        lastName: 'Rogers',
        username: 'scoobydoo',
        email: 'shaggyandscoob@scoobydoo.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Cat',
        lastName: 'Hat',
        username: 'drseusscat',
        email: 'catinthehat@seuss.com',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Stuart',
        lastName: 'Little',
        username: 'littlemouse',
        email: 'littlefamily@columbia.com',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Peter',
        lastName: 'Rabbit',
        username: 'peterrabbit',
        email: 'petterrabbit@sony.com',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Jonathan',
        lastName: 'Arbuckle',
        username: 'garfield',
        email: 'garfieldworl@paramount.com',
        hashedPassword: bcrypt.hashSync('password8')
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUser', 'snoopy', 'tomandjerry', 'scoobydoo', 'drseusscat', 'littlemouse', 'peterrabbit', 'garfield' ] }
    }, {});
  }
};
