import { Router } from 'express';

import monsters from './monsters.js';
import habitats from './habitats.js';
import lives from './lives.js';
import { app } from '../app.js';

const router = Router();

router.use('/monsters', monsters);
router.use('/habitats', habitats);
router.use('/lives', lives);

export default router;
