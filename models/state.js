'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    state: DataTypes.STRING,
    abbrev: DataTypes.STRING,
    primary_date: DataTypes.DATEONLY,
    primary_type: DataTypes.STRING,
    pledged_delegates: DataTypes.INTEGER,
    automatic_delegates: DataTypes.INTEGER,
    delegates: DataTypes.JSONB,
  }, {
    tableName: 'states',
    underscored: true
  });
  State.associate = function(models) {
    // associations can be defined here
  };
  sequelizePaginate.paginate(State)
  return State;
};
