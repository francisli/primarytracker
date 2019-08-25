'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pollster = sequelize.define('Pollster', {
    pollster: DataTypes.STRING,
    display_name: DataTypes.STRING,
    pollster_rating_id: DataTypes.INTEGER
  }, {
    tableName: 'pollsters',
    underscored: true
  });
  Pollster.associate = function(models) {
    // associations can be defined here
  };
  return Pollster;
};
