'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primary_date: {
        type: Sequelize.DATEONLY
      },
      primary_type: {
        type: Sequelize.STRING
      },
      pledged_delegates: {
        type: Sequelize.INTEGER
      },
      automatic_delegates: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function() {
      return queryInterface.addIndex('states', {
        unique: true,
        fields: ['state'],
        name: 'states_unique_idx'
      });
    }).then(function() {
      return queryInterface.addConstraint('polls', ['state'], {
        type: 'foreign key',
        references: {
          table: 'states',
          field: 'state'
        }
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('polls', 'polls_state_states_fk').then(function() {
      return queryInterface.dropTable('states');
    });
  }
};
