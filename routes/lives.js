import { Router } from 'express';
import { pool } from '../db/index.js';

const router = Router();

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM lives', (err, res) => {
    if (err) {
      return next(err);
    }

    response.json(res.rows);
  });
});

router.get('/conditions', (request, response, next) => {
  pool.query(
    'SELECT * FROM lives JOIN habitats ON habitats.name = lives.habitat JOIN monsters ON monsters.name = lives.monster',
    (err, res) => {
      if (err) {
        return next(err);
      }

      const rowsWithoutNames = res.rows.map((row) => ({
        ...row,
        name: undefined,
      }));

      response.json(rowsWithoutNames);
    },
  );
});

export default router;
