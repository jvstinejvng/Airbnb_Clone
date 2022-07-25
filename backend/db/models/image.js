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
      // define association here
      Image.belongsTo(
        models.Review, 
        {
          foreignKey: 'reviewId', onDelete: 'CASCADE'
        }
      );

      Image.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId', onDelete: 'CASCADE'
        }
      );
    }
  }
  Image.init({
    url:{
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    reviewId:{
      type: DataTypes.INTEGER,
    }, 
    spotId: {
      type: DataTypes.INTEGER,
    },
    imageableId: {
      type: DataTypes.INTEGER,
    },
    imageableType: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};