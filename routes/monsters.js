import { Router } from 'express';
import { pool } from '../db/index.js';

const router = Router();

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
    if (err) {
      return next(err);
    }

    response.json(res.rows);
  });
});

router.get('/id/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('SELECT * FROM monsters WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err);
    }

    response.json(res.rows);
  });
});

router.get('/random', (request, response, next) => {
  pool.query('SELECT * FROM monsters', (err, res) => {
    if (err) {
      return next(err);
    }

    response.json(
      res.rows.length > 0
        ? res.rows[Math.floor(Math.random() * res.rows.length)]
        : [],
    );
  });
});

router.post('/', (request, response, next) => {
  const { name, personality } = request.body;

  pool.query(
    'INSERT INTO monsters(name, personality) VALUES ($1, $2)',
    [name, personality],
    (err, res) => {
      if (err) {
        return next(err);
      }

      response.redirect('/monsters');
    },
  );
});

router.put('/id/:id', (request, response, next) => {
  const { id } = request.params;
  const updatingKeys = ['name', 'personality'];
  const fields = [];

  updatingKeys.forEach((key) => {
    const value = request.body[key];

    if (value) {
      fields.push([key, value]);
    }
  });

  fields.forEach(([key, value], index) => {
    pool.query(
      `UPDATE monsters SET ${key}=($1) WHERE id=($2)`,
      [value, id],
      (err, res) => {
        if (err) {
          return next(err);
        }

        if (index === fields.length - 1) {
          response.redirect('/monsters');
        }
      },
    );
  });
});

router.delete('/id/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('DELETE FROM monsters WHERE id=($1)', [id], (err, res) => {
    if (err) {
      return next(err);
    }

    response.redirect('/monsters');
  });
});

export default router;
