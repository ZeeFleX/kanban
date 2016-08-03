'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    countryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.User);
        this.belongsTo(models.City);
        this.belongsTo(models.Country);
      }
    }
  });
  return Profile;
};
