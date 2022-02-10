const express = require('express');
// Server
const server = express();
server.use(express.json());
// Router
const { logger } = require('../api/middleware/middleware');
const usersRouter = require('./users/users-router');
server.use('/api/users', logger, usersRouter);

module.exports = server;
