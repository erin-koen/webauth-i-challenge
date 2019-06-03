const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

// bring in routes
const authRoute = require("./Data/Routes/authRoute.js");
const usersRoute = require("./Data/Routes/usersRoute.js");

// declare server
const server = express();

//set up sessionConfig

const sessionConfig = {
  name: "sessioning",
  secret:
    "Need to figure out what this is for, if it's just something to add to a hash function",
  cookie: {
    maxAge: 1000 * 60 * 20, //20 min
    secure: false, //no https required
    httpOnly: true //no JS allowed
  },
  resave: false, //avoid recreating existing unch sessions
  saveUninitialized: true, //GDPR compliance, \__o__/ need more reading here too
  store: new KnexSessionStore({
    // this caused "sqlite does not support inserting default values" warning to pup up in the server listener but disappears when you point it to dbConfig.js
    knex: require("./Data/dbConfig.js"),
    tablename: "sessions", // store creates a new table in the db called sessions
    sidfieldname: "sid", // primary key in the new table... how is this generated?
    createtable: true, // if there isn't a table there named sessions, fire one up please knex
    clearInterval: 100 * 600 * 30 // 30 min sweep for expired sessions
  })
};

//fire up global middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// assign routes
server.use("/api/auth", authRoute);
server.use("/api/users", usersRoute);

//put something on the root route
server.get("/", (req, res) => {
  res.send("Everything is A-OK");
});

module.exports = server;
