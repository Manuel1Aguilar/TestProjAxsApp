'use strict';
import
  Model
from " sequelize";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    slp: DataTypes.INTEGER,
    cups: DataTypes.INTEGER,
    isDefault: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Match, {
      foreignKey: 'userId',
    })
  };

  return User;
};