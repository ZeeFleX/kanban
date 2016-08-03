'use strict';
module.exports = function(sequelize, DataTypes) {
  var Optgroup = sequelize.define('Optgroup', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Option);
      }
    }
  });
  return Optgroup;
};
