'use strict';
module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define('Status', {
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
  return Status;
};
