const express = require('express');
const router = express.Router();

const pollsRouter = require('./polls');
const statesRouter = require('./states');
const uploadsRouter = require('./uploads');
const usersRouter = require('./users');

router.use('/polls', pollsRouter);
router.use('/states', statesRouter);
router.use('/uploads', uploadsRouter);
router.use('/users', usersRouter);

module.exports = router;
