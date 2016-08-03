'use strict';
module.exports = function(sequelize, DataTypes) {
  var Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    phoneCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.City);
        this.hasMany(models.Profile);
      }
    }
  });
  return Country;
};
