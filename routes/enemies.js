import { Router } from 'express';
import { pool } from '../db/index.js';

const router = Router();

router.get('/', (request, response, next) => {
  pool.query(
    'SELECT monsters.name AS monster_name, monsters.personality AS monster_personality, aliens.name AS alien_name, aliens.superpower AS alien_superpower FROM enemies JOIN monsters ON monsters.id = enemies.monster_id JOIN aliens ON aliens.id = enemies.alien_id',
    (err, res) => {
      if (err) {
        return next(err);
      }

      const rowsWithoutId = res.rows.map((row) => ({
        ...row,
        id: undefined,
      }));

      response.json(rowsWithoutId);
    },
  );
});

router.post('/', (request, response, next) => {
  const { monster_id, alien_id } = request.body;

  pool.query(
    'INSERT INTO enemies(monster_id, alien_id) VALUES ($1, $2)',
    [monster_id, alien_id],
    (err, res) => {
      if (err) {
        return next(err);
      }

      response.redirect('/enemies');
    },
  );
});

export default router;
