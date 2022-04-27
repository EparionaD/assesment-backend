import Favorite from '../models/Favorite';
import jwt from 'jsonwebtoken';

export const createFavorite = async (req, res) => {
  const { title, description, url } = req.body;

  const token = req.headers['authorization'];
  const bearerToken = token.split(' ')[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_WORD);

  const newFavorite = new Favorite({
    title,
    description,
    url,
    author: decoded.id,
  });

  const favoriteSave = await newFavorite.save();

  res.status(201).json(favoriteSave);
};
export const getFavorites = async (req, res) => {
  const token = req.headers['authorization'];
  const bearerToken = token.split(' ')[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_WORD);

  const listFavorites = await Favorite.find({ author: decoded.id });
  res.status(200).json(listFavorites);
};
export const getFavoritesById = async (req, res) => {
  const { id } = req.params;
  const favoriteId = await Favorite.findById(id);
  res.status(200).json(favoriteId);
};
export const deleteFavoriteById = async (req, res) => {
  const { id } = req.params;
  await Favorite.findByIdAndDelete(id);
  res.status(204).json();
};
