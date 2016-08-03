'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasOne(models.Profile);
        this.belongsToMany(models.Project, { through: models.ProjectUser });
        this.hasMany(models.Task, {as: 'reporter', foreignKey: 'reporterId'});
        this.hasMany(models.Task, {as: 'assignee', foreignKey: 'assigneeId'});
      }
    }
  });
  return User;
};
