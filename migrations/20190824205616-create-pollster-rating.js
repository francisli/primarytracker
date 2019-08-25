'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pollster_ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pollster_rating_name: {
        type: Sequelize.STRING
      },
      fte_grade: {
        type: Sequelize.STRING
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
      return queryInterface.addConstraint('pollsters', ['pollster_rating_id'], {
        type: 'foreign key',
        references: {
          table: 'pollster_ratings',
          field: 'id'
        }
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('pollsters', 'pollsters_pollster_rating_id_pollster_ratings_fk').then(function() {
      return queryInterface.dropTable('pollster_ratings');
    });
  }
};
