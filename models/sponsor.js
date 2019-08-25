'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sponsor = sequelize.define('Sponsor', {
    sponsor: DataTypes.STRING
  }, {
    tableName: 'sponsors',
    underscored: true
  });
  Sponsor.associate = function(models) {
    // associations can be defined here
  };
  return Sponsor;
};
