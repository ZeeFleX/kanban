'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectOption = sequelize.define('ProjectOption', {
    val: DataTypes.TEXT,
    projectId: DataTypes.INTEGER,
    optionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProjectOption;
};