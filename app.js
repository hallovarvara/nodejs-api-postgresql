import express from 'express';
import bodyParser from 'body-parser';
import monsters from './routes/monsters.js';
import habitats from './routes/habitats.js';

export const app = express();

app.use(bodyParser.json());

app.use('/monsters', monsters);

app.use('/habitats', habitats);

app.use((err, req, res, next) => {
  res.json(err);
});
