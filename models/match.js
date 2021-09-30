'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Match.init({
    slp: DataTypes.INTEGER,
    cups: DataTypes.INTEGER,
    result: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  Match.associate = function(models) {
    Match.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete:'CASCADE'
    })
  };
  return Match;
};