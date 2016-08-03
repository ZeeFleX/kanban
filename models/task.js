'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    reporterId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    swimlaneId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    trackerId: DataTypes.INTEGER,
    sort: DataTypes.INTEGER,
    dueDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.User, {as: 'reporter', foreignKey: 'reporterId'});
        this.belongsTo(models.User, {as: 'assignee', foreignKey: 'assigneeId'});
        this.belongsTo(models.Project);
        this.belongsTo(models.Swimlane);
        this.belongsTo(models.Status);
        this.belongsTo(models.Tracker);
      }
    }
  });
  return Task;
};
