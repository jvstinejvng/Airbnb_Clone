"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
  
    static associate(models) {
      Spot.belongsTo(models.User, {
        as: 'Owner',
        foreignKey: 'ownerId',
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      Spot.hasMany(models.Image, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: [2, 20]
      }
    },
    country: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL(11, 7),
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
      }
    },
    lng: {
      type: DataTypes.DECIMAL(11, 7),
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  },
    {
      sequelize,
      modelName: "Spot",
      indexes: [
        {
          unique: true,
          fields: ['lat', 'lng']
        }
      ],
      scopes: {
        noPreviewImage: {
          attributes: {
            exclude: ['previewImage']
          }
        }
      },
    });
  return Spot;
};
