/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Op, Sequelize } from 'sequelize';
import { createWriteStream } from 'fs';
import isAdmin from '../middlewares/isAdmin';
import { Education, Photo } from '../../db/models';

const shortid = require('shortid');

const ExcelJS = require('exceljs');

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
    // console.log(jsonData);
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
  // console.log('--------------------------->', req.body);
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
router.post('/photoAdd', async (req, res) => {
  try {
    const eduId = req.body.id;
    const data = req.body.input;
    // console.log(req.body);
    const foto = await Photo.create({
      education_id: eduId,
      urlPhoto: data,
    });
    res.json(foto);
  } catch (error) {
    console.log('Error adding photo:', error);
    res.status(500).json({ message: 'Error adding photo' });
  }
});
router.patch('/photoChange', async (req, res) => {
  try {
    const eduId = req.body.id;
    const data = req.body.input;
    const { pId } = req.body;
    const photo = await Photo.findOne({ where: { education_id: eduId, id: pId } });
    if (!photo) {
      return res.status(404).json({ error: 'Фотография не найдена' });
    }
    photo.urlPhoto = data;
    await photo.save();
    return res.json(photo);
  } catch (error) {
    console.log('Error changing photo:', error);
    res.status(500).json({ message: 'Error changing photo' });
  }
});

router.post('/download', async (req, res) => {
  try {
    const { allEntries } = req.body;

    const uniqueIds = [];
    const arr = [];

    allEntries.forEach((el) => {
      if (!uniqueIds.includes(el.id)) {
        uniqueIds.push(el.id);
        arr.push(
          Education.findAll({
            include: Photo,
            where: {
              name: { [Op.like]: `%${el.name}%` },
              address: { [Op.like]: `%${el.address}%` },
              advertising: { [Op.like]: `%${el.advertising}%` },
              uuID: { [Op.like]: `%${el.uuID}%` },
            },
          }),
        );
      }
    });

    const filterMaps = await Promise.all(arr);
    const filterMap = JSON.parse(JSON.stringify(filterMaps));

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.addRow([
      'Город',
      'УЗ',
      'Адрес',
      'Описание места размещения РИМ',
      'Фото 1',
      'Фото 2',
      'Ссылка на страницу',
    ]);

    filterMap.forEach((row) => {
      row.forEach((el) => {
        const photos = el.Photos?.map((photo) => photo.urlPhoto);

        const pageLink = `${req.protocol}://${req.get('host')}/window/${el.uuID}`; // Формирование ссылки на страницу

        worksheet.addRow([
          el.city,
          el.name,
          el.address,
          el.advertising,
          { text: 'Фото', hyperlink: photos?.[0] || '' },
          { text: 'Фото', hyperlink: photos?.[1] || '' },
          { text: 'Посмотреть подробнее', hyperlink: pageLink }, // Добавление гиперссылки на страницу
        ]);
      });
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        const cellValue = cell.value;
        if (cellValue && typeof cellValue.hyperlink === 'string') {
          cell.value = { text: cellValue.text, hyperlink: cellValue.hyperlink };
        }
      });
    });

    const stream = createWriteStream('filtered_data.xlsx');

    await workbook.xlsx.write(stream);

    stream.end();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=filtered_data.xlsx');

    res.sendFile('filtered_data.xlsx', { root: '.' });
  } catch (error) {
    console.error('Ошибка при скачивании данных:', error);
    res.status(500).json({ success: false, message: 'Ошибка при скачивании данных' });
  }
});
export default router;
