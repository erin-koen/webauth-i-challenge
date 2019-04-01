const db = require("../dbConfig.js");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser,
  getUsers,
  findUserByName
};

function findUserByID(id) {
  return db("users").where({ id });
}

function findUserByName(name) {
  return db("users").where({ username: name });
}
// should you do the hashing at the helper level? Or on the route? Seems like the simpler you make this, the better. Hmmm.
async function createUser(user) {
  const [username] = await db("users").insert(user);
  return findUserByName(username);
}

async function getUsers(user) {}
