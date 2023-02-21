'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      // method will return an object with only the User instance information that is safe to save to a JWT(id, username, and email)
      const { id, email } = this; // context will be the User instance
      return { id, email };
    };

    validatePassword(password) {
      // returns true if there is a match with the User instance's hashedPassword
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    };

    static getCurrentUserById(id) {
      // uses the currentUser scope to return a User with that id
      return User.scope("currentUser").findByPk(id);
    };

    static async login({ email, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        // searches for one User with the specified credential
        where: {
          [Op.or]: {
            // username: credential,
            // email: credential
            email: email
          }
        }
      });
      // if user is found, validate the password using .validatePassword method
      if (user && user.validatePassword(password)) {
        // if password is valid, method will return user by using currentUser scope
        return await User.scope('currentUser').findByPk(user.id,
          { attributes: ['id', 'firstName', 'lastName', 'email'] });
      }
    };

    // creates a user with the username, email, and hashedPassword
    static async signup({ firstName, lastName, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id, {
        attributes: ['id', 'firstName', 'lastName', 'email']
      });
    };

    static associate(models) {
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Image, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
    }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      profile_url: {
        type: DataTypes.TEXT
      },
    }, {
    sequelize,
    modelName: "User",
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
