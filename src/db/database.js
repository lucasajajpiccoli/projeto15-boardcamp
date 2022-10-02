import pkg from 'pg';

import '../setup.js';

const { Pool } = pkg;

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { connection };
