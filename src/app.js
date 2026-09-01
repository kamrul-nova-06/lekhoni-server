const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');

require('./database/database');

const activationRoutes = require('./activation/activation.routes');
const adminRoutes = require('./admin/admin.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Lekhoni Server is running',
  });
});

app.use('/api/activation', activationRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Lekhoni Server running on port ${PORT}`);
});
