const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../Helpers/usersHelper.js");

const router = express.Router();

router.post("/login", (req, res) => {
  //desctructure the things you need off req.body
  let { username, password } = req.body;
  //pass username to db find method to confirm it exists
  console.log(username);
  Users.findUserByFilter({ username })// why does this need to be destructured?
    //take the first result
    .first()
    //check that result's password's hash against the hash of the one that was entered in the req, also that the user exists
    .then(user => {
      if (user.username && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; // initiate a session specific to this user
        res.status(200).send(`Welcome, ${user.first_name}`);
      } else {
        res.status(401).send(`Bad creds, friend. Try again.`);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/register", async (req, res) => {
  // console.log(req);
  const { first_name, last_name, username, password } = req.body;
  // console.log(first_name, last_name, username, password);
  if (first_name && last_name && username && password) {
    try {
      let user = req.body;
      user.password = bcrypt.hashSync(user.password, 8);
      const newUser = await Users.createUser(user);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(400)
      .send("Please be sure to include all characteristics of a user");
  }
});

module.exports = router;
