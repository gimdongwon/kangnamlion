import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';

import indexRouter from './routes/index.js';

const app = express();
const __dirname = path.resolve();
dotenv.config();

app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'started server');
});

export default app;
