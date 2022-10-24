import { Router } from 'express';
import { pool } from '../db/index.js';

const router = Router();

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM aliens ORDER BY id ASC', (err, res) => {
    if (err) {
      return next(err);
    }

    response.json(res.rows);
  });
});

router.get('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('SELECT * FROM aliens WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(res);
    }

    response.json(res.rows);
  });
});

router.post('/', (request, response, next) => {
  const { name, superpower } = request.body;

  pool.query(
    'INSERT INTO aliens(name, superpower) VALUES ($1, $2)',
    [name, superpower],
    (err, res) => {
      if (err) {
        return next(res);
      }

      response.redirect('/aliens');
    },
  );
});

router.put('/:id', (request, response, next) => {
  const { id } = request.params;
  const updatingKeys = ['name', 'superpower'];
  const fields = [];

  updatingKeys.forEach((key) => {
    const value = request.body[key];

    if (value) {
      fields.push([key, value]);
    }
  });

  fields.forEach(([key, value], index) => {
    pool.query(
      `UPDATE aliens SET ${key}=($1) WHERE id=($2)`,
      [value, id],
      (err, res) => {
        if (err) {
          return next(err);
        }

        if (index === fields.length - 1) {
          response.redirect('/aliens');
        }
      },
    );
  });
});

router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('DELETE FROM aliens WHERE id=($1)', [id], (err, res) => {
    if (err) {
      return next(err);
    }

    response.redirect('/aliens');
  });
});

export default router;
