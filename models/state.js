'use strict';
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    state: DataTypes.STRING,
    primary_date: DataTypes.DATEONLY,
    primary_type: DataTypes.STRING,
    pledged_delegates: DataTypes.INTEGER,
    automatic_delegates: DataTypes.INTEGER
  }, {
    tableName: 'states',
    underscored: true
  });
  State.associate = function(models) {
    // associations can be defined here
  };
  return State;
};
