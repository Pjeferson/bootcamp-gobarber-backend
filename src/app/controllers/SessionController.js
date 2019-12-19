import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async index(req, res) {}
  async show(req, res) {}
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, name, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
  async update(req, res) {}
  async delete(req, res) {}
}

export default new SessionController();
