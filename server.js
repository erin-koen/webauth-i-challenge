const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// bring in routes
const loginRoute = require('./Data/Routes/loginRoute.js');
const registerRoute = require('./Data/Routes/registerRoute.js')
const usersRoute = require('./Data/Routes/usersRoute.js')
// declare server
const server = express();

//fire up global middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

// assign routes
server.use("/api/login", loginRoute);
server.use("/api/register", registerRoute);
server.use("/api/users", usersRoute);

//put something on the root route
server.get('/', (req, res) => {
    res.send('Everything is A-OK');
});

module.exports = server;