const db = require("../dbConfig.js");

module.exports = {
  createUser,
  getUsers,
  findUserByFilter,
  findUserByID
};

function findUserByFilter(filter) {
  return db("users").where(filter);
}

function findUserByID(id) {
  return db("users").where({ id: id });
}
// should you do the hashing at the helper level? Or on the route? Seems like the simpler you make this, the better. Hmmm.
async function createUser(user) {
  const [id] = await db("users").insert(user);
  return findUserByID(id);
}

function getUsers() {
  return db("users").select(
    "id",
    "first_name",
    "last_name",
    "username",
    "password"
  );
}
