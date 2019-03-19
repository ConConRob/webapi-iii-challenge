const express = require('express');
const userRoutes = require('./Routers/userRoutes')
const uppercaseNames = require('./UpperCaseNameMW.js')


const server = express();
server.use(express.json());
server.use(uppercaseNames)
server.use('/api/users', userRoutes)

module.exports = server