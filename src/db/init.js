const fs = require('fs');
const path = require('path');
const { pool } = require('./index');

async function run() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');
  try {
    await pool.query(sql);
    // eslint-disable-next-line no-console
    console.log('Database schema applied');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to apply schema', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

run();


