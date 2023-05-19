const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('123', 5);

    // Создание сида для модели Users
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Ольга',
        password: passwordHash,
        email: 'olga@olga',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin',
        password: passwordHash,
        email: 'admin@admin',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});

    // Удалите сиды для других моделей, если необходимо

    return Promise.resolve();
  },
};
