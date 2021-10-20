'use strict';
const { users } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      users.create({
        username: "zia",
        role: 1,
        password: bcrypt.hashSync("123456", +authConfig.rounds),
        audit: [
          {
            auditype: "audit"
          }
        ]
      }, {
        include: "audits"
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('audits', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ]);
  }
};
