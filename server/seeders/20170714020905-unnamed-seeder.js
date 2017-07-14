'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'quiquecorreav@gmail.com',
      passwordHash: "$2a$10$fjCRE4oNXpWAXdVxlG/OH.domY44aS55MqRhqOJ42mjTj1bIP18C.", // 12345
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
