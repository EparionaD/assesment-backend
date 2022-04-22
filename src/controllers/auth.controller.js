import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

export const register = async (req, res) => {
  const { email, password, roles } = req.body;
  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 10),
  });

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.status(200).json({ token });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email: email }).populate('roles');

  if (!userFound) return res.status(400).json({ message: 'User not found' });

  const matchPassword = await bcrypt.compare(password, userFound.password);

  if (!matchPassword)
    return res.status(401).json({ token: null, message: 'Invalid password' });

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  res.json({ token: token });
};

export const user = async (req, res) => {
  const listUsers = await User.find();
  res.json(listUsers);
};
