"use strict";

const { faker } = require("@faker-js/faker");

const TODOS_DATA_COUNT = 10;

const todos = [];

for (let dataCounter = 0; dataCounter < TODOS_DATA_COUNT; dataCounter++) {
  let todo = {};

  todo.name = faker.lorem.sentence();
  todo.completed = faker.datatype.boolean();
  todo.createdAt = todo.updatedAt = new Date();

  todos.push(todo);
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Todos", todos, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Todos", null, {});
  },
};
