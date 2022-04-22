import Favorite from '../models/Favorite';
import config from '../config';
import jwt from 'jsonwebtoken';

export const createFavorite = async (req, res) => {
  const { title, description, url } = req.body;

  const token = req.headers['x-access-token'];
  const decoded = jwt.verify(token, config.SECRET);

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
  const token = req.headers['x-access-token'];
  const decoded = jwt.verify(token, config.SECRET);
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
