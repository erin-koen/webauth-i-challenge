const express = require("express");
const db = require("../dbConfig.js");
const Users = require("../Helpers/usersHelper.js");
const router = express.Router();

// build a piece of middleware that confirms the user exists in the db in order to see the list of users. Stick it before (req, res)
router.get("/", authorize, async (req, res) => {
  try {
    console.log("authorized");
    const users = await Users.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

function authorize(req, res, next) {
  //desctructure the things you need off req.header
  let { username, password } = req.body;
  console.log(username, password);
  //pass username to db find method to confirm it exists
  Users.findUserByName(username)
    //take the first result
    .first()
    //check that result's password's hash against the hash of the one that was entered in the req, also that the user exists
    .then(user => {
      if (user.username && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).send(`Bad creds, friend. Try again.`);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
