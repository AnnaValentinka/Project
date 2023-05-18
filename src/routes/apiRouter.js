/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import isAdmin from '../middlewares/isAdmin';
import { Education, Photo } from '../../db/models';

const multer = require('multer');

const XLSX = require('xlsx');

const upload = multer({ dest: 'public/uploads/' });

const router = express.Router();

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

export default router;
