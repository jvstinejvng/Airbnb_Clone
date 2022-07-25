'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo( models.Review,  { foreignKey: 'reviewId', onDelete: 'CASCADE' });
      Image.belongsTo( models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE' });
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