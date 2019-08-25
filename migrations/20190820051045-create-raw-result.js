'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('raw_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      poll_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cycle: {
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING
      },
      pollster_id: {
        type: Sequelize.INTEGER
      },
      pollster: {
        type: Sequelize.STRING
      },
      sponsor_ids: {
        type: Sequelize.STRING
      },
      sponsors: {
        type: Sequelize.STRING
      },
      display_name: {
        type: Sequelize.STRING
      },
      pollster_rating_id: {
        type: Sequelize.INTEGER
      },
      pollster_rating_name: {
        type: Sequelize.STRING
      },
      fte_grade: {
        type: Sequelize.STRING
      },
      sample_size: {
        type: Sequelize.INTEGER
      },
      population: {
        type: Sequelize.STRING
      },
      population_full: {
        type: Sequelize.STRING
      },
      methodology: {
        type: Sequelize.STRING
      },
      office_type: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      end_date: {
        type: Sequelize.DATEONLY
      },
      sponsor_candidate: {
        type: Sequelize.STRING
      },
      internal: {
        type: Sequelize.BOOLEAN
      },
      partisan: {
        type: Sequelize.STRING
      },
      tracking: {
        type: Sequelize.BOOLEAN
      },
      nationwide_batch: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      stage: {
        type: Sequelize.STRING
      },
      party: {
        type: Sequelize.STRING
      },
      answer: {
        type: Sequelize.STRING
      },
      candidate_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pct: {
        type: Sequelize.FLOAT
      }
    }).then(function() {
      return queryInterface.addIndex('raw_results', {
        fields: ['question_id', 'poll_id', 'candidate_name'],
        unique: true,
        name: 'raw_results_unique_idx'
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('raw_results');
  }
};
