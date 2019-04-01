const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const createFakeUser = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  username: faker.internet.userName(),
  password: faker.internet.password()
});

exports.seed = async function(knex, Promise) {
  const fakeUsers = [];
  
  // creating an arbitrary number of fake users
  for (let i = 0; i < 100; i++) {
    fakeUsers.push(createFakeUser());
  }

  // using fs to push a json file of all users to the root directory, so that you know what their passwords are prior to hashing.
  fs.writeFileSync("./authTestInfo.json", JSON.stringify({ users: fakeUsers }));

  //how can you use .map here? doesn't this create a new array? Wouldn't forEach be better?
  fakeUsers.map(user => {
    user.password = bcrypt.hashSync(user.password, 8);
  });
  return await knex("users").insert(fakeUsers)
};
