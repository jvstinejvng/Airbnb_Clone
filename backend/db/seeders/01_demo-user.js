'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password1'),
        profile_url: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
      },
      {
        firstName: 'Mia',
        lastName: 'Thermopolis',
        email: 'MiaThermopolis@Genovia.com',
        hashedPassword: bcrypt.hashSync('password2'),
        profile_url: "https://images.saymedia-content.com/.image/t_share/MTg1Nzk1Mjk1MDEwMjM1Nzk2/mia-thermopolis-top-ten-outfits-from-the-princess-diaries-films.jpg"
      },
      {
        firstName: 'Robert',
        lastName: 'Neville',
        email: 'RobertNeville@Iamlegend.com',
        hashedPassword: bcrypt.hashSync('password3'),
        profile_url: "https://media.wired.com/photos/5a597f6701a4232aacd92777/4:3/w_300,h_225,c_limit/i_am_legend_will_smith__1_.jpg"
      },
      {
        firstName: 'Emily Elizabeth',
        lastName: 'Elizabeth',
        email: 'Elizabeth@Clifford.com',
        hashedPassword: bcrypt.hashSync('password4'),
        profile_url: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
      },
      {
        firstName: 'Elle',
        lastName: 'Woods,',
        email: 'ElleWoods,@Legallyblonde.com',
        hashedPassword: bcrypt.hashSync('password5'),
        profile_url: "https://www.etonline.com/sites/default/files/styles/video_1920x1080/public/images/2020-05/eto_c02_legally_blonde_3_052620_0.jpg"
      },
      {
        firstName: 'Ron',
        lastName: 'Burgundy',
        email: 'RonBurgundy@Anchorman.com',
        hashedPassword: bcrypt.hashSync('password6'),
        profile_url: "https://www.nme.com/wp-content/uploads/2016/09/anchormanpress040810-1.jpg"
      },
      {
        firstName: 'Scott',
        lastName: 'Turner',
        email: 'ScottTurner@Turnerandhooch.com',
        hashedPassword: bcrypt.hashSync('password7'),
        profile_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXfrITi7eU2oFykGtG3N0k0fkBzJEwN1AWcA&usqp=CAU"
      },
      {
        firstName: 'Peter',
        lastName: 'Rabbit',
        email: 'petterrabbit@RabbitHole.com',
        hashedPassword: bcrypt.hashSync('password8'),
        profile_url: "https://media.vanityfair.com/photos/5a81a950112b4c50fd8b2f40/5:3/w_2000,h_1200,c_limit/peter-rabbit-movie.jpg"
      },
      {
        firstName: 'Jonathan',
        lastName: 'Arbuckle',
        email: 'JonArbuckle@Garfield.com',
        hashedPassword: bcrypt.hashSync('password9'),
        profile_url: "https://i.pinimg.com/originals/fc/ca/3b/fcca3b20854ba5d00569d3b2b028b076.png"
      },
      {
        firstName:'Charlie',
        lastName: 'Brown',
        email: 'CharlieBrown@Snoopy.com',
        hashedPassword: bcrypt.hashSync('password10'),
        profile_url: "https://lwlies.com/wp-content/uploads/2015/12/charlie-brown-and-snoopy-the-peanuts-movie-review.jpg"
      },
      {
        firstName:'Dorothy',
        lastName: 'Gale',
        email: 'DorothyGale@Toto.com',
        hashedPassword: bcrypt.hashSync('password11'),
        profile_url: "https://cdn.britannica.com/53/188353-050-B83CEAD5/Judy-Garland-Dorothy-Gale-The-Wizard-of.jpg"
      },
      {
        firstName:'John',
        lastName: 'Dolittle',
        email: 'DoctorDolittle@Dolittle.com',
        hashedPassword: bcrypt.hashSync('password12'),
        profile_url: "https://is4-ssl.mzstatic.com/image/thumb/rNkwOUOAUd3yE1_I0e1l5A/1200x675mf.jpg"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
