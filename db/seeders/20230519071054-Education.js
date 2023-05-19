/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Education',
      [
        {
          city: 'Moscow',
          name: 'MGU',
          address: 'Moscow, Lenina, 1',
          advertising: 'y vhoda v obwezhitee',
          uuID: uuidv4(),
        },
        {
          city: 'SPB',
          name: 'SPBGU',
          address: 'SPB, Lenina, 1',
          advertising: 'y vhoda v obwezhitee',
          uuID: uuidv4(),
        },
        {
          city: 'Kazan',
          name: 'KGU',
          address: 'Kazan, Lenina, 1',
          advertising: 'y vhoda v obwezhitee',
          uuID: uuidv4(),
        },
        {
          city: 'Saratov',
          name: 'SGU',
          address: 'Saratov, Lenina, 1',
          advertising: 'y vhoda v obwezhitee',
          uuID: uuidv4(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Education', null, {});
  },
};
