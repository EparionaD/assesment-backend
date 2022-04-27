import jwt from 'jsonwebtoken';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provider' });
    console.log(process.env.SECRET_WORD);

    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.SECRET_WORD);

    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json({ message: 'no user found' });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
