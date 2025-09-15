require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const { notFoundHandler, errorHandler } = require('./src/middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});


