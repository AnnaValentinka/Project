import express from 'express';
import { Education } from '../../db/models';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const educations = await Education.findAll();
    const initState = { educations };
    res.render('Layout', initState);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.get('/window', (req, res) => {
  res.render('Layout', {});
});

export default router;
