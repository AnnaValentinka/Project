/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import isAdmin from '../middlewares/isAdmin';
import { Education, Photo } from '../../db/models';

const yandexDisk = require('yandex-disk');

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
          { city: { [Op.substring]: req.body.input } },
          { name: { [Op.substring]: req.body.input } },
          { address: { [Op.substring]: req.body.input } },
          { advertising: { [Op.substring]: req.body.input } },
        ],
      },
    });
    res.json(searchedData);
  } catch (err) {
    console.log(err);
  }
});
//   where: { city: { [Op.substring]: req.body.input } },
//   where: { name: { [Op.substring]: req.body.input } },
// });
// res.json(searchedData);
// console.log(searchedData);
// });

export default router;
