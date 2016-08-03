'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsToMany(models.User, { through: models.ProjectUser });
        this.belongsToMany(models.Option, { through: models.ProjectOption });
        this.hasMany(models.Status);
        this.hasMany(models.Swimlane);
        this.hasMany(models.Tracker);
        this.hasMany(models.Task);
      }
    }
  });
  return Project;
};
