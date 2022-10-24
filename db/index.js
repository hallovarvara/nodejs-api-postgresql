import pg from 'pg';

import dbConfig from '../secrets/db_configuration.js';

const { user, host, database, password, port } = dbConfig;

export const pool = new pg.Pool({ user, host, database, password, port });
