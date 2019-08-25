'use strict';
module.exports = (sequelize, DataTypes) => {
  const PollsterRating = sequelize.define('PollsterRating', {
    pollster_rating_name: DataTypes.STRING,
    fte_grade: DataTypes.STRING
  }, {
    tableName: 'pollster_ratings',
    underscored: true
  });
  PollsterRating.associate = function(models) {
    // associations can be defined here
  };
  return PollsterRating;
};
