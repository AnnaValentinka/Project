/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op, Sequelize } from 'sequelize';
import { createWriteStream } from 'fs';
import isAdmin from '../middlewares/isAdmin';
import { Education, Photo } from '../../db/models';

const ExcelJS = require('exceljs');
// const fs = require('fs/promises');

const multer = require('multer');

const XLSX = require('xlsx');

const upload = multer({ dest: 'public/uploads/' });

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploadsPhoto/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const uploadPhoto = multer({ storage });

// router.post('/uploadPhoto', uploadPhoto.single('image'), async (req, res) => {
//   try {
//     // Получение информации о загруженном изображении
//     const { filename, path } = req.file;

//     // Сохранение информации об изображении в базе данных
//     const photo = await Photo.create({ filename, filepath: path });

//     // Сохранение изображения на Яндекс.Диске
//     const yandexDiskClient = yandexDisk.createClient({
//       token:
//         'https://oauth.yandex.ru/authorize?response_type=token&client_id=<e76d1a0fe3b94f0dbcdd92f6cd0d4646>', // Замените на ваш токен Яндекс.Диска
//     });
//     await yandexDiskClient.uploadFile(path, `/images/${filename}`);

//     res.status(200).json({ success: true, message: 'Изображение успешно загружено' });
//   } catch (error) {
//     console.error('Ошибка при загрузке изображения:', error);
//     res.status(500).json({ success: false, message: 'Ошибка при загрузке изображения' });
//   }
// });

router.get('/pars', (req, res) => {
  res.render('Layout', {});
});
router.post('/upload', isAdmin, upload.single('file'), async (req, res) => {
  const { file } = req;

  try {
    const workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // console.log(worksheet);
    // Преобразование данных из worksheet в массив объектов
    const cells = Object.keys(worksheet);
    cells.forEach((cell) => {
      // If cell contains a hyperlink, overwrite the raw value with the hyperlink
      if (worksheet[cell].l && worksheet[cell].l.Target) {
        worksheet[cell].v = worksheet[cell].l.Target;
      }
    });
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
    // Обработка и сохранение данных в базу данных
    for (const data of jsonData) {
      const { city, name, address, advertising } = data;

      // Создание записи города
      const education = await Education.create({
        city: data['Город'],
        name: data['УЗ'],
        address: data['Адрес'],
        advertising: data['Описание места размещения РИМ'],
        uuID: uuidv4(),
      });
      const educationId = education.id; // Получаем ID созданного поста

      const photoFields = Object.keys(data).filter((key) => key.startsWith('Фото'));
      for (const field of photoFields) {
        if (data[field]) {
          await Photo.create({
            education_id: educationId,
            urlPhoto: data[field],
          });
        }
      }
    }
    // res.json({ message: 'File uploaded and data saved successfully' });
  } catch (error) {
    console.log('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});
router.put('/update', isAdmin, upload.single('file'), async (req, res) => {
  const { file } = req;

  try {
    // Удаление существующих записей
    await Education.destroy({ truncate: true, cascade: true });

    const workbook = XLSX.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const cells = Object.keys(worksheet);
    cells.forEach((cell) => {
      if (worksheet[cell].l && worksheet[cell].l.Target) {
        worksheet[cell].v = worksheet[cell].l.Target;
      }
    });

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    for (const data of jsonData) {
      const { city, name, address, advertising } = data;

      const education = await Education.create({
        city: data['Город'],
        name: data['УЗ'],
        address: data['Адрес'],
        advertising: data['Описание места размещения РИМ'],
        uuID: uuidv4(),
      });

      const educationId = education.id;

      const photoFields = Object.keys(data).filter((key) => key.startsWith('Фото'));
      for (const field of photoFields) {
        if (data[field]) {
          await Photo.create({
            education_id: educationId,
            urlPhoto: data[field],
          });
        }
      }
    }

    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.log('Error updating data:', error);
    res.status(500).json({ message: 'Error updating data' });
  }
});

router.post('/entries/search', async (req, res) => {
  // console.log(req.body);
  try {
    const searchedData = await Education.findAll({
      where: {
        [Op.or]: [
          {
            city: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('city')),
              'LIKE',
              `%${req.body.input.toLowerCase()}%`,
            ),
          },
          {
            name: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('name')),
              'LIKE',
              `%${req.body.input.toLowerCase()}%`,
            ),
          },
          {
            address: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('address')),
              'LIKE',
              `%${req.body.input.toLowerCase()}%`,
            ),
          },
          {
            advertising: Sequelize.where(
              Sequelize.fn('LOWER', Sequelize.col('advertising')),
              'LIKE',
              `%${req.body.input.toLowerCase()}%`,
            ),
          },
        ],
      },
    });
    res.json(searchedData);
  } catch (err) {
    console.log(err);
  }
});

router.post('/download', async (req, res) => {
  const test = await Photo.findAll();
  console.log(test);
  try {
    const { allEntries } = req.body;
    const arr = [];

    allEntries.forEach((el) => {
      arr.push(
        Education.findOne({
          include: Photo,
          where: {
            [Op.or]: [
              { city: { [Op.like]: `%${el.city}%` } },
              { name: { [Op.like]: `%${el.name}%` } },
              { address: { [Op.like]: `%${el.address}%` } },
              { advertising: { [Op.like]: `%${el.advertising}%` } },
              { uuID: { [Op.like]: `%${el.uuID}%` } },
            ],
          },
        }),
      );
    });

    const filterMap = await Promise.all(arr);

    console.log({ filterMap });
    // Создание нового Excel-документа

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Заголовки столбцов
    worksheet.addRow([
      'Город',
      'УЗ',
      'Адрес',
      'Описание места размещения РИМ',
      'Фото 1',
      'Фото 2',
      'Ссылка на страницу',
    ]);

    //  console.log('--------------------------------------', filterMap);
    // Добавление отфильтрованных данных в Excel-документ
    filterMap.forEach((row) => {
      console.log({ row });
      // filteredData.forEach((row) => {
      // Добавление данных в Excel-документ

      worksheet.addRow([
        row.city,
        row.name,
        row.address,
        row.advertising,
        row.Photos?.map((el) => el.urlPhoto).join(', '), // Замените на соответствующие значения столбцов фото
        row.pageLink,
      ]);
    });

    // Создание потока для записи данных в файл
    const stream = createWriteStream('filtered_data.xlsx');

    // Сохранение Excel-документа в поток
    await workbook.xlsx.write(stream);

    // Завершение потока записи в файл
    stream.end();

    // Установка заголовков и типа контента для ответа
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=filtered_data.xlsx');

    // Отправка файла в ответе
    res.sendFile('filtered_data.xlsx', { root: '.' });
  } catch (error) {
    console.error('Ошибка при скачивании данных:', error);
    res.status(500).json({ success: false, message: 'Ошибка при скачивании данных' });
  }
});

export default router;
