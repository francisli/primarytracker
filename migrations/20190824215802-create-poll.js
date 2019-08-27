'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('polls', {
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
      answers: {
        type: Sequelize.JSONB
      },
      answers_length: {
        type: Sequelize.INTEGER
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function() {
      return queryInterface.addIndex('polls', {
        fields: ['question_id', 'poll_id'],
        unique: true,
        name: 'polls_unique_idx'
      });
    }).then(function() {
      return queryInterface.addIndex('polls', {
        fields: ['end_date', 'state']
      });
    }).then(function() {
      return queryInterface.createTable('polls_sponsors', {
        poll_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'polls',
            key: 'id'
          }
        },
        sponsor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'sponsors',
            key: 'id'
          }
        },
      }).then(function() {
        return queryInterface.addIndex('polls_sponsors', {
          fields: ['poll_id', 'sponsor_id'],
          unique: true,
          name: 'polls_sponsors_unique_idx'
        });
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('polls_sponsors').then(function() {
      return queryInterface.dropTable('polls');
    });
  }
};
