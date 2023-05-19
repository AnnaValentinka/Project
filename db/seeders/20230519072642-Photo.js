/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Photos',
      [
        {
          education_id: 1,
          urlPhoto:
            'https://downloader.disk.yandex.ru/preview/758a185c1a4ef97db93bde818282f73dcd464803c44b368eb2721c57ace3abec/64676561/AGoL-AEtAZhLENER7hHwAU4thtEGJKp5t5PuMaRuJcMZjum5ftsDs-MqsXac9MF9h94PxS_KEtyNmnyYBfKUZA%3D%3D?uid=0&filename=%D0%9E%D0%93%D0%A3_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%20%E2%84%96%2011_%D0%90048.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
        },
        {
          education_id: 2,
          urlPhoto:
            'https://downloader.disk.yandex.ru/preview/758a185c1a4ef97db93bde818282f73dcd464803c44b368eb2721c57ace3abec/64676561/AGoL-AEtAZhLENER7hHwAU4thtEGJKp5t5PuMaRuJcMZjum5ftsDs-MqsXac9MF9h94PxS_KEtyNmnyYBfKUZA%3D%3D?uid=0&filename=%D0%9E%D0%93%D0%A3_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%20%E2%84%96%2011_%D0%90048.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
        },
        {
          education_id: 2,
          urlPhoto:
            'https://downloader.disk.yandex.ru/preview/758a185c1a4ef97db93bde818282f73dcd464803c44b368eb2721c57ace3abec/64676561/AGoL-AEtAZhLENER7hHwAU4thtEGJKp5t5PuMaRuJcMZjum5ftsDs-MqsXac9MF9h94PxS_KEtyNmnyYBfKUZA%3D%3D?uid=0&filename=%D0%9E%D0%93%D0%A3_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%20%E2%84%96%2011_%D0%90048.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
        },
        {
          education_id: 3,
          urlPhoto:
            'https://downloader.disk.yandex.ru/preview/758a185c1a4ef97db93bde818282f73dcd464803c44b368eb2721c57ace3abec/64676561/AGoL-AEtAZhLENER7hHwAU4thtEGJKp5t5PuMaRuJcMZjum5ftsDs-MqsXac9MF9h94PxS_KEtyNmnyYBfKUZA%3D%3D?uid=0&filename=%D0%9E%D0%93%D0%A3_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%20%E2%84%96%2011_%D0%90048.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
        },
        {
          education_id: 3,
          urlPhoto:
            'https://downloader.disk.yandex.ru/preview/758a185c1a4ef97db93bde818282f73dcd464803c44b368eb2721c57ace3abec/64676561/AGoL-AEtAZhLENER7hHwAU4thtEGJKp5t5PuMaRuJcMZjum5ftsDs-MqsXac9MF9h94PxS_KEtyNmnyYBfKUZA%3D%3D?uid=0&filename=%D0%9E%D0%93%D0%A3_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%20%E2%84%96%2011_%D0%90048.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
        },
        {
          education_id: 4,
          urlPhoto:
            'https://downloader.disk.yandex.ru/preview/758a185c1a4ef97db93bde818282f73dcd464803c44b368eb2721c57ace3abec/64676561/AGoL-AEtAZhLENER7hHwAU4thtEGJKp5t5PuMaRuJcMZjum5ftsDs-MqsXac9MF9h94PxS_KEtyNmnyYBfKUZA%3D%3D?uid=0&filename=%D0%9E%D0%93%D0%A3_%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%20%E2%84%96%2011_%D0%90048.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Photos', null, {});
  },
};
