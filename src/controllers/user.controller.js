import User from '../models/User';

export const user = async (req, res) => {
  const listUsers = await User.find();
  res.json(listUsers);
};
