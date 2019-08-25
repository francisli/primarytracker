'use strict';
module.exports = (sequelize, DataTypes) => {
  const RawResult = sequelize.define('RawResult', {
    question_id: DataTypes.INTEGER,
    poll_id: DataTypes.INTEGER,
    cycle: DataTypes.INTEGER,
    state: DataTypes.STRING,
    pollster_id: DataTypes.INTEGER,
    pollster: DataTypes.STRING,
    sponsor_ids: DataTypes.STRING,
    sponsors: DataTypes.STRING,
    display_name: DataTypes.STRING,
    pollster_rating_id: DataTypes.INTEGER,
    pollster_rating_name: DataTypes.STRING,
    fte_grade: DataTypes.STRING,
    sample_size: DataTypes.INTEGER,
    population: DataTypes.STRING,
    population_full: DataTypes.STRING,
    methodology: DataTypes.STRING,
    office_type: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    sponsor_candidate: DataTypes.STRING,
    internal: DataTypes.BOOLEAN,
    partisan: DataTypes.STRING,
    tracking: DataTypes.BOOLEAN,
    nationwide_batch: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    notes: DataTypes.TEXT,
    url: DataTypes.TEXT,
    stage: DataTypes.STRING,
    party: DataTypes.STRING,
    answer: DataTypes.STRING,
    candidate_name: DataTypes.STRING,
    pct: DataTypes.FLOAT
  }, {
    indexes: [
      {
        unique: true,
        fields: ['question_id', 'poll_id', 'candidate_name'],
        name: 'raw_results_unique_idx'
      }
    ],
    tableName: 'raw_results',
    timestamps: false,
    underscored: true
  });
  RawResult.associate = function(models) {
    // associations can be defined here
  };
  return RawResult;
};
