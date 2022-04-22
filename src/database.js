import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost/assestmentdb')
  .then((db) => console.log('Db is connected'))
  .catch((error) => console.log(error));
