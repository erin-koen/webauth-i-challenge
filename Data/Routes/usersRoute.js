const express = require("express");
const bcrypt = require("bcryptjs");
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

async function authorize(req, res, next) {
  //desctructure the things you need off req.header
  let { username, password } = req.body;
  console.log(username, password);
  //pass username to db find method to confirm it exists
  const user = await Users.findUserByName(username);

  try {
    if (bcrypt.compareSync(password, user.password)) {
      next();
    } else {
      res.status(401).send(`Bad creds, friend. Try again.`);
    }
  } catch (error) {
    res
      .status(500)
      .send("Alas, you made it this far to encounter a server error");
  }

}

module.exports = router;
