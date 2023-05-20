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
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.sendStatus(400);
    }

    const [foundUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password: await bcrypt.hash(password, 5) },
    });

    if (!created) {
      return res.sendStatus(403);
    }

    req.session.user = foundUser;

    return res.sendStatus(200);
  } catch (error) {
    console.log('Error signing up:', error);
    return res.status(500).json({ message: 'Error signing up' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.sendStatus(401);
    }

    req.session.user = user;
    return res.sendStatus(200);
  } catch (error) {
    console.log('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});

authRouter.get('/logout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('user_sid').sendStatus(200);
  } catch (error) {
    console.log('Error logging out:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
});

export default authRouter;
