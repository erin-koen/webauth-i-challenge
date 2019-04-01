const express = require("express");
// const db = require("../dbConfig.js");
const bcrypt = require("bcryptjs");
const Users = require("../Helpers/usersHelper.js");

const router = express.Router();

router.post("/", async (req, res) => {
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
