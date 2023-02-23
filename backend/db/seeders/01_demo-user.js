'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        email:'demo@user.io',
        hashedPassword: bcrypt.hashSync('password1'),
        profile_url: "https://cdn-icons-png.flaticon.com/512/3940/3940404.png"
      },
      {
        firstName: 'Mia',
        lastName: 'Thermopolis',
        email: 'MiaThermopolis@Genovia.com',
        hashedPassword: bcrypt.hashSync('password2'),
        profile_url: "https://hips.hearstapps.com/hmg-prod/images/2jhcp9d-1668624680.jpg"
      },
      {
        firstName: 'Robert',
        lastName: 'Neville',
        email: 'RobertNeville@Iamlegend.com',
        hashedPassword: bcrypt.hashSync('password3'),
        profile_url: "https://www.gannett-cdn.com/authoring/2007/12/13/NSTT/ghows-NB-3cb1ddc9-9076-4439-96f1-c7372cbc1375-dbaedeee.jpeg"
      },
      {
        firstName: 'Frasier',
        lastName: 'Crane',
        email: 'FrasierCrane@Eddie.com',
        hashedPassword: bcrypt.hashSync('password4'),
        profile_url: "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F0ac5af6c-775a-11eb-9d58-b0b1ea096ce7.jpg"
      },
      {
        firstName: 'Elle',
        lastName: 'Woods,',
        email: 'ElleWoods,@Legallyblonde.com',
        hashedPassword: bcrypt.hashSync('password5'),
        profile_url: "https://media.glamour.com/photos/5ffb80551a8162ada2fd5c3a/4:3/w_677,h_508,c_limit/MCDLEBL_EC017.jpg"
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
        profile_url: "https://64.media.tumblr.com/e582e7210793bafb9df03ce3fbec2d74/tumblr_pb3m6oyVZf1vakv0po1_1280.jpg"
      },
      {
        firstName: 'Jenny',
        lastName: 'Grogan',
        email: 'JenntGrogan@Marley.com',
        hashedPassword: bcrypt.hashSync('password8'),
        profile_url: "https://m.media-amazon.com/images/M/MV5BNTYzMDcxMjI2MV5BMl5BanBnXkFtZTcwOTE5MjYwMg@@._V1_.jpg"
      },
      {
        firstName: 'Parker',
        lastName: 'Wilson',
        email: 'ParkerWilson@Hachi.com',
        hashedPassword: bcrypt.hashSync('password9'),
        profile_url: "https://vickiwongandhachi.com/wp-content/uploads/2018/07/img-richard-kissing-hachi-e1621696616494.jpg"
      },
      {
        firstName:'Jay',
        lastName: 'Pritchett',
        email: 'Jay Pritchett@Stella.com',
        hashedPassword: bcrypt.hashSync('password10'),
        profile_url: "https://offstage.com.br/wp-content/uploads/2020/03/stella.png"
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
        profile_url: "https://www.thegoldencloset.com/merchant/graphics/00000001/C0005j.jpg"
      },
      {
        firstName:'Steve',
        lastName: 'Irwin',
        email: 'StephenIrwin@Crocodilehunter.com',
        hashedPassword: bcrypt.hashSync('password13'),
        profile_url: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1129401.jpg"
      },
      {
        firstName:'London',
        lastName: 'Tipton',
        email: 'LondonTipton@Suitelife.com',
        hashedPassword: bcrypt.hashSync('password14'),
        profile_url: "https://img.buzzfeed.com/buzzfeed-static/static/2021-04/21/23/enhanced/e3c7216fd0c4/enhanced-1261-1619049537-9.png"
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'CharlieBrown@Peanuts.com',
        hashedPassword: bcrypt.hashSync('password15'),
        profile_url: 'https://cdnph.upi.com/svc/sv/i/6781446141893/2015/1/14461422722657/Watch-The-Peanuts-Movie-trailer-celebrates-series-65-year-history.jpg',
      },
      {
        firstName: 'Tom',
        lastName: 'Jerry',
        email: 'TomCat@Warnerbrothers.com',
        hashedPassword: bcrypt.hashSync('password16'),
        profile_url: 'https://i.pinimg.com/originals/21/6c/af/216caf52fa80cb0c7c69507ecebdc4c2.jpg',
      },
      {
        firstName: 'Shaggy',
        lastName: 'Rogers',
        email: 'Shaggyandscoob@Scoobydoo.com',
        hashedPassword: bcrypt.hashSync('password17'),
        profile_url: 'https://pbs.twimg.com/profile_images/1483172973506875394/PlmLS1ie_400x400.jpg',
      },
      {
        firstName: 'Stuart',
        lastName: 'Little',
        email: 'LittleFamily@Columbia.com',
        hashedPassword: bcrypt.hashSync('password18'),
        profile_url: 'https://greenhill-library.org/wp-content/uploads/2021/12/film-stuart-little.jpg',
      },
      {
        firstName: 'Peter',
        lastName: 'Rabbit',
        email: 'PetterRabbit@Sony.com',
        hashedPassword: bcrypt.hashSync('password19'),
        profile_url: 'https://greenhill-library.org/wp-content/uploads/2021/12/film-stuart-little.jpg',
      },
      {
        firstName: 'Jonathan',
        lastName: 'Arbuckle',
        email: 'Garfieldworld@Paramount.com',
        hashedPassword: bcrypt.hashSync('password20'),
        profile_url: 'https://i.pinimg.com/originals/fc/ca/3b/fcca3b20854ba5d00569d3b2b028b076.png',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
