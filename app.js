import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';

export const app = express();

app.use(bodyParser.json());
app.use('/', routes);

app.use((err, req, res, next) => {
  res.json(err);
});
