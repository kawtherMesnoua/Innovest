const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const SALT_ROUNDS = 10;

function createToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

async function register(req, res, next) {
  try {
    const { email, password, fullName, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }
    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'email already in use' });
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.createUser({ email, passwordHash, fullName, role });
    const token = createToken(user);
    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role }
    });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ message: 'invalid credentials' });
    }
    const token = createToken(user);
    return res.json({
      token,
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role }
    });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.sub);
    if (!user) return res.status(404).json({ message: 'not found' });
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login, me };


