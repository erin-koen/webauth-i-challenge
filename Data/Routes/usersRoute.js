const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../dbConfig.js");
const Users = require("../Helpers/usersHelper.js");
const router = express.Router();
// build a piece of middleware that confirms the user exists in the db in order to see the list of users. Stick it before (req, res)
router.get("/", authorizedWithCookies, async (req, res) => {
  try {
    console.log("authorized");
    const users = await Users.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// function authorizeOldSchool(req, res, next) {
//   //desctructure the things you need off req.header
//   let { username, password } = req.body;
//   //pass username to db find method to confirm it exists
//   Users.findUserByFilter({ username })
//     .first()
//     .then(user => {
//       if (bcrypt.compareSync(password, user.password)) {
//         next();
//       } else {
//         res.status(401).send(`Bad creds, friend. Try again.`);
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// }

function authorizedWithCookies(req, res, next) {
  console.log("cookie check engage");
  if (req.session && req.session.user) {
    //double check on what's being compared here
    console.log("cookie check complete");
    next();
  } else {
    res.status(401).send("Bad creds, friend. Try again.");
  }
}

module.exports = router;
