'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProjectUser = sequelize.define('ProjectUser', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProjectUser;
};