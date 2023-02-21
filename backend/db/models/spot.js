'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' })
      Spot.hasMany(models.Review, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
      Spot.hasMany(models.Image, { foreignKey: 'spotId', as: 'images', onDelete: 'CASCADE', hooks: true })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL(8, 6),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0.00
      }
    },
    guests: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numReviews: {
      type: DataTypes.INTEGER,
    },
    avgStarRating: {
      type: DataTypes.DECIMAL(3, 2),
    },
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['numReviews', 'avgStarRating']
      }
    }
  });
  return Spot;
};
