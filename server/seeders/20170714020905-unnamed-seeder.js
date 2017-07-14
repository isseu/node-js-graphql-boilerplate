'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'quiquecorreav@gmail.com',
      passwordHash: "WZRHGrsBESr8wYFZ9sx0tPURuZgG2lmzyvWpwXPKz8U=", // 12345
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
