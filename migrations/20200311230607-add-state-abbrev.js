'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('states', 'abbrev', {
      type: Sequelize.STRING
    }).then(function() {
      return queryInterface.addIndex('states', {
        unique: true,
        fields: ['abbrev'],
        name: 'states_abbrev_unique_idx'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('states', 'abbrev');
  }
};
