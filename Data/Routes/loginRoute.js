const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../Helpers/usersHelper.js");

const router = express.Router();

router.post("/", (req, res) => {
  //desctructure the things you need off req.body
  let { username, password } = req.body;
  console.log(username);
  //pass username to db find method to confirm it exists
  Users.findUserByName(username)
    //take the first result
    .first()
    //check that result's password's hash against the hash of the one that was entered in the req, also that the user exists
    .then(user => {
        if (user & bcrypt.compareSync(password, user.password)) {
          res.status(200).send(`Welcome, ${user.first_name}`);
        } else {
          res.status(401).send(`Bad creds, friend. Try again.`);
        }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
