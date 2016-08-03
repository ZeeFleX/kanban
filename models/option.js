'use strict';
module.exports = function(sequelize, DataTypes) {
  var Option = sequelize.define('Option', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    optgroupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.belongsTo(models.Optgroup);
        this.belongsToMany(models.Project, { through: models.ProjectOption });
      }
    }
  });
  return Option;
};
