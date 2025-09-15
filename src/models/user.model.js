const db = require('../db');

async function findByEmail(email) {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] || null;
}

async function createUser({ email, passwordHash, fullName, role }) {
  const { rows } = await db.query(
    'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1,$2,$3,$4) RETURNING *',
    [email, passwordHash, fullName || null, role || 'customer']
  );
  return rows[0];
}

async function findById(id) {
  const { rows } = await db.query('SELECT id, email, full_name, role, created_at, updated_at FROM users WHERE id = $1', [id]);
  return rows[0] || null;
}

module.exports = {
  findByEmail,
  createUser,
  findById
};


