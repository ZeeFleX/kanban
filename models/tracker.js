'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tracker = sequelize.define('Tracker', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    projectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Project);
        this.hasMany(models.Task);
      }
    }
  });
  return Tracker;
};
