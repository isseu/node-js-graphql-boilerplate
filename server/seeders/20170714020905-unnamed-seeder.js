'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('User', [{
      name: 'John Doe',
      isBetaMember: false
    }]);
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
