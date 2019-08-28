'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define('Poll', {
    question_id: DataTypes.INTEGER,
    poll_id: DataTypes.INTEGER,
    cycle: DataTypes.INTEGER,
    state: DataTypes.STRING,
    pollster_id: DataTypes.INTEGER,
    sample_size: DataTypes.INTEGER,
    population: DataTypes.STRING,
    population_full: DataTypes.STRING,
    methodology: DataTypes.STRING,
    office_type: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    sponsor_candidate: DataTypes.STRING,
    internal: DataTypes.BOOLEAN,
    partisan: DataTypes.BOOLEAN,
    tracking: DataTypes.BOOLEAN,
    nationwide_batch: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    notes: DataTypes.TEXT,
    url: DataTypes.TEXT,
    stage: DataTypes.STRING,
    party: DataTypes.STRING,
    answers: DataTypes.JSONB,
    answers_length: DataTypes.INTEGER,
    averages: DataTypes.JSONB,
    averages_length: DataTypes.INTEGER,
    updated_at: DataTypes.DATE
  }, {
    indexes: [
      {
        unique: true,
        fields: ['question_id', 'poll_id'],
        name: 'polls_unique_idx'
      }
    ],
    tableName: 'polls',
    timestamps: false,
    underscored: true,
  });
  Poll.associate = function(models) {
    // associations can be defined here
    Poll.belongsTo(models.Pollster, {as: 'pollster', foreignKey: 'pollster_id'});
    Poll.belongsToMany(models.Sponsor, {through: 'polls_sponsors'});
  };
  sequelizePaginate.paginate(Poll)
  return Poll;
};
