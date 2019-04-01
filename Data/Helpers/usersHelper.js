const db = require("../dbConfig.js");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser,
  getUsers,
  findUserByName
};


function findUserByName(name) {
  return db("users").where({ username: name });
}

function findUserByID(id){
    return db("users").where({ id:id })
}
// should you do the hashing at the helper level? Or on the route? Seems like the simpler you make this, the better. Hmmm.
async function createUser(user) {
  const [id] = await db("users").insert(user);
  return findUserByID(id);
}

async function getUsers(user) {}
