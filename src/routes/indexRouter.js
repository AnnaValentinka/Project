import express from 'express';
import { where } from 'sequelize';
import { Education, Photo } from '../../db/models';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Layout', {});
});
router.get('/home', (req, res) => {
  res.render('Layout', {});
});
router.get('/window', (req, res) => {
  res.render('Layout', {});
});
router.get('/window/:id', async (req, res) => {
  try {
    const uuID = req.params.id;
    const post = await Education.findOne({ where: { uuID } });
    const postPhotos = await Photo.findAll({
      where: {
        education_id: post.id,
      },
    });

    const initState = {
      post,
      photos: postPhotos,
    };

    res.set('Access-Control-Allow-Origin', '*'); // Устанавливаем заголовок CORS

    res.render('Layout', initState);
  } catch (error) {
    console.log('Error fetching post and photos:', error);
    res.status(500).json({ message: 'Error fetching post and photos' });
  }
});

router.get('/window/:id', async (req, res) => {
  try {
    const uuID = req.params.id;
    const post = await Education.findOne({ where: { uuID } });
    const postPhotos = await Photo.findAll({
      where: {
        education_id: post.id,
      },
    });

    const initState = {
      post,
      photo: postPhotos,
    };
    console.log(photo);
    res.render('Layout', initState);
  } catch (error) {
    console.log('Error fetching post and photos:', error);
    res.status(500).json({ message: 'Error fetching post and photos' });
  }
});

router.get('/table', async (req, res) => {
  try {
    const posts = await Education.findAll();
    const photos = [];
    for (const post of posts) {
      const postPhotos = await Photo.findAll({
        where: {
          education_id: post.id,
        },
      });

      post.dataValues.photos = postPhotos;

      photos.push(...postPhotos);
    }
    const initState = {
      posts,
      photos,
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.render('Layout', initState);
  } catch (error) {
    console.log('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

export default router;
