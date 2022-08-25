'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      Image.belongsTo(
        models.Review,
          { foreignKey: 'reviewId' }
      );

      Image.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
    }
  }
  Image.init({
    url: DataTypes.STRING,
    reviewId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
  
};
