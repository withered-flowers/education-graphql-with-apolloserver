"use strict";

const { faker } = require("@faker-js/faker");

const COLORS_DATA_COUNT = 10;

const colors = [];

for (let dataCounter = 0; dataCounter < COLORS_DATA_COUNT; dataCounter++) {
  let color = {};

  color.name = faker.color.human();
  color.year = faker.datatype.number({ min: 1990, max: 2050 });
  color.color = faker.color.rgb();
  color.createdAt = color.updatedAt = new Date();

  colors.push(color);
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

    await queryInterface.bulkInsert("Colors", colors, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Colors", null, {});
  },
};
