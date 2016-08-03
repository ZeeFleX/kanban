'use strict';
module.exports = function(sequelize, DataTypes) {
  var City = sequelize.define('City', {
    name: DataTypes.STRING,
    countryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Country);
        this.hasMany(models.Profile);
      }
    }
  });
  return City;
};
