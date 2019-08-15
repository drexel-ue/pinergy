const faker = require("faker");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

let users = {};

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    for (let index = 0; index < 5; index++) {
      let newUser = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.name.jobDescriptor(),
        password: "test123",
        email: faker.internet.email(),
        age: Math.round(Math.random() * 999999999999),
        location: faker.locale,
        profilePhotoUrl: faker.internet.avatar()
      });

      bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;
        console.log("here");
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              users[user.id] = user;
              console.log("1", users);
              if (index === 4) mongoose.connection.close();
            })
            .catch(e => console.log(e));
        });
      });
    }
  })
  .catch(err => console.log(err));
