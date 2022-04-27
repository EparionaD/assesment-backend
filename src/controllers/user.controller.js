import User from '../models/User';

export const user = async (req, res) => {
  const listUsers = await User.find();

  const token2 = req.headers['authorization'];
  const palabra = token2.split(' ')[1];
  console.log(palabra);
  // console.log(token2);

  res.json(listUsers);
};
