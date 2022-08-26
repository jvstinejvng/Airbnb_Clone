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
        firstName: 'Mia',
        lastName: 'Thermopolis',
        email: 'MiaThermopolis@Genovia.com',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Robert',
        lastName: 'Neville',
        email: 'RobertNeville@Iamlegend.com',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Elle',
        lastName: 'Woods,',
        email: 'ElleWoods,@Legallyblonde.com',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Ron',
        lastName: 'Burgundy',
        email: 'RonBurgundy@Anchorman.com',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Scott',
        lastName: 'Turner',
        email: 'ScottTurner@Turnerandhooch.com',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        firstName: 'Peter',
        lastName: 'Rabbit',
        email: 'petterrabbit@RabbitHole.com',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        firstName: 'Jonathan',
        lastName: 'Arbuckle',
        email: 'JonArbuckle@Garfield.com',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName:'Charlie',
        lastName: 'Brown',
        email: 'CharlieBrown@Snoopy.com',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        firstName:'Dorothy',
        lastName: 'Gale',
        email: 'DorothyGale@Toto.com',
        hashedPassword: bcrypt.hashSync('password8')
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      firstName: { [Op.in]: ['Demo', 'Mia', 'Robert', 'Elle', 'Ron', 'Scott', 'Peter', 'Jonathan', 'Charlie', 'Dorothy'] }
    }, {});
  }
};
