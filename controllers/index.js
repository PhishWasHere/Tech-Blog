const express = require('express');
const router = express.Router();

const homeRoutes = require('./routes/index');
const userRoutes = require('./routes/userRoutes');

router.use('/', homeRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
