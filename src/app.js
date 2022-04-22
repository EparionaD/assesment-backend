import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.set('pkg', pkg);
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});
app.use('/api/favs', appRoutes);
app.use('/api/local', authRoutes);
app.use('/api/local', userRoutes);

export default app;
