'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
  
    static associate(models) {
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId', onDelete: 'CASCADE' }
      );

      Review.belongsTo(
        models.Spot,
          { foreignKey: 'spotId', onDelete: 'CASCADE' }
      );

      Review.hasMany(
        models.Image,
        { foreignKey: 'reviewId', onDelete: 'CASCADE' }
      );
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: '',
      
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '',
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};