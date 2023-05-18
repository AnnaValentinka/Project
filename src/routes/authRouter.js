import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

const authRouter = express.Router();
authRouter.get('/signup', (req, res) => {
  res.render('Layout', {});
});
authRouter.get('/login', (req, res) => {
  res.render('Layout', {});
});

authRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) res.sendStatus(400);

  const [foundUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, password: await bcrypt.hash(password, 5) },
  });

  if (!created) res.sendStatus(403);

  req.session.user = foundUser;

  res.sendStatus(200);
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) res.sendStatus(400);

  const user = await User.findOne({ where: { email } });

  if (!user) res.sendStatus(400);

  if (!(await bcrypt.compare(password, user.password))) res.sendStatus(401);

  req.session.user = user;
  res.sendStatus(200);
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid').sendStatus(200);
});

export default authRouter;
