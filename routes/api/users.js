const faker = require("faker");
// Used to sign source of truth tokens for session and protected routes.
const jwt = require("jsonwebtoken");
// Provides access to secret.
const keys = require("../../config/keys");
// Needed to create the router.
const express = require("express");
// Handles directing requests to the desired handlers.
const router = express.Router();
// Used to encrypt passwords.
const bcrypt = require("bcryptjs");
// User model.
const User = require("../../models/User");
// For validating tokens.
const passport = require("passport");
// Validates registration form.
const validateRegisterInput = require("../../validation/register");
// Validates login form.
const validateLoginInput = require("../../validation/login");
// Validates updates.
const validateUpdate = require("../../validation/update_user");

// NB: The callback for every Express route requires a request and response as arguments.
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// Handles creation of new users.
router.post("/register", (req, res) => {
  // Runs validation method and deconstructs its return.
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    // Returns errors if any.
    return res.status(400).json(errors);
  }

  const body = req.body;
  // First check to make sure this email is not already in use.
  User.findOne({ email: body.email }).then(user => {
    if (user) {
      // Use the validations to send the error.
      errors.email = "This email is already in use.";
      // Throw a 400 user if the email is already in use.
      return res.status(400).json(errors);
    } else {
      // Else, create a new user.

      let index = body.email.trim().indexOf("@");
      let usernamedef = body.email.trim().slice(0, index);
      const newUser = new User({
        age: body.age,
        email: body.email,
        password: body.password,
        username: usernamedef
      });

      // Salt the password.
      bcrypt.genSalt(10, (error, salt) => {
        // Throw an error if there is one.
        if (error) throw error;
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          // Throw an error if there is one.
          if (error) throw error;
          // Set the newUser object's password to the salted password (hash).
          newUser.password = hash;
          newUser
            // Save the new user document to the database.
            .save()
            // Return a json object representing the new user document as processed by the databse.
            .then(user => {
              const payload = { id: user.id };

              jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    user: user,
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            // Log any errors.
            .catch(error => console.log(error));
        });
      });
    }
  });
});

// Handles logging in.
router.post("/login", (req, res) => {
  // Runs validation method and deconstructs its return.
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    // Return 400 if invalid form.
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      // Use the validations to send the error.
      errors.email = `There is no user with the email: ${email}`;
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(good => {
      if (good) {
        const payload = { id: user.id };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              user: user,
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        // Use the validations to send the error.
        errors.password = "Incorrect password";
        return res.status(400).json((errors.password = "Incorrect password"));
      }
    });
  });
});

// Serves specific user.
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return User.findById(req.params.id).then(user => res.json(user)).catch(err => {debugger });
  }
);

router.get(
  "/profile/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return User.findOne({ username: req.params.username }).then(user => res.json(user)).catch(err => { debugger });
  }
);

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  // Grab user to be updated.
  User.findById(id, async (err, user) => {
    if (err) {
      return res.status(400).json(err);
    }

    // Run validation.
    const validation = await validateUpdate(user, req.body);

    if (validation.isValid) {
      await User.findByIdAndUpdate(id, req.body);
      return res.json(validation.mergedUserData);
    } else {
      return res.status(400).json(validation.errors);
    }
  });
});

// To serve users matching a query string.
router.get("/search/:queryString", (req, res) => {
  const queryString = req.params.queryString;

  User.find({
    $or: [
      { username: { $regex: "^" + queryString, $options: "i" } },
      { firstName: { $regex: "^" + queryString, $options: "i" } },
      { lastName: { $regex: "^" + queryString, $options: "i" } }
    ]
  })
    .limit(3)
    .exec((err, users) => {
      if (err) return res.status(400).json(err);
      res.json(users);
    });
});

router.post("/follow", async (req, res) => {
  const errors = [];

  const followeeId = req.body.followeeId;
  const followerId = req.body.followerId;

  let followee = await User.findById(followeeId);
  let follower = await User.findById(followerId);

  followee.followers.push(followerId);
  follower.following.push(followeeId);

  followee = await followee.save().catch(err => errors.push(err.toString()));
  follower = await follower.save().catch(err => errors.push(err.toString()));

  // [].filter()
  if (errors.length > 0) {
    return res.status(400).json(errors);
  } else {
    return res.json({
      followee,
      follower
    });
  }
});

module.exports = router;
