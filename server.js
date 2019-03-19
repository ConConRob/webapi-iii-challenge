const express = require("express");
const userRoutes = require("./Routers/userRoutes");
const postRoutes = require("./Routers/postRoutes");
const uppercaseNames = require("./UpperCaseNameMW.js");

const server = express();
server.use(express.json());
server.use(uppercaseNames);

server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

module.exports = server;
