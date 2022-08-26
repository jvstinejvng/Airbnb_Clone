'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Review, {
        foreignKey: 'reviewId'
      });
      Image.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
    }
  }
  Image.init({
    spotId: {
      type: DataTypes.INTEGER,
    },
    reviewId: DataTypes.INTEGER,
    imageableType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Review', 'Spot']]
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Image;
};
