const express = require('express');
const morgan = require('morgan');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use('/api/schemes', SchemeRouter);

module.exports = server;