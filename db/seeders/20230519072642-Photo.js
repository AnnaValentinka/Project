/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          education_id: 1,
          urlPhoto: 'https://disk.yandex.ru/i/oAXqcby8jbjSrg',
        },
        {
          education_id: 2,
          urlPhoto: 'https://disk.yandex.ru/i/oAXqcby8jbjSrg',
        },
        {
          education_id: 2,
          urlPhoto: 'https://disk.yandex.ru/i/oAXqcby8jbjSrg',
        },
        {
          education_id: 3,
          urlPhoto: 'https://disk.yandex.ru/i/oAXqcby8jbjSrg',
        },
        {
          education_id: 3,
          urlPhoto: 'https://disk.yandex.ru/i/oAXqcby8jbjSrg',
        },
        {
          education_id: 4,
          urlPhoto: 'https://disk.yandex.ru/i/oAXqcby8jbjSrg',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Photos', null, {});
  },
};
