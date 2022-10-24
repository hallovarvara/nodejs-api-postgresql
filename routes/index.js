import { Router } from 'express';

import monsters from './monsters.js';
import habitats from './habitats.js';
import lives from './lives.js';
import aliens from './aliens.js';
import enemies from './enemies.js';

const router = Router();

router.use('/monsters', monsters);
router.use('/habitats', habitats);
router.use('/lives', lives);
router.use('/aliens', aliens);
router.use('/enemies', enemies);

export default router;
