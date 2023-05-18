// import express from 'express';
// import { Education, Photo } from '../../db/models';

// const router = express.Router();

// // router.get('/', (req, res) => {
// //   res.render('Layout', {});
// // });
// // // router.get('/pars', (req, res) => {
// // //   res.render('Layout', {});
// // // });

// router.get('/', async (req, res) => {
//   try {
//     const posts = await Education.findAll();
//     const photos = [];
//     for (const post of posts) {
//       const postPhotos = await Photo.findAll({
//         where: {
//           education_id: post.id,
//         },
//       });

//       post.dataValues.photos = postPhotos;

//       photos.push(...postPhotos);
//     }
//     const initState = {
//       posts,
//       photos,
//     };

//     console.log(photos);
//     res.render('Layout', initState);
//   } catch (error) {
//     console.log('Error fetching posts:', error);
//     res.status(500).json({ message: 'Error fetching posts' });
//   }
// });
// export default router;
