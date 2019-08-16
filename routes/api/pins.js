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
const Pin = require("../../models/Pin");
// For validating tokens.
const passport = require("passport");
// Validates registration form.
const validateRegisterInput = require("../../validation/register");
// Validates login form.
const validateLoginInput = require("../../validation/login");
// Validates updates.
const validateUpdate = require("../../validation/update_user");

const scraper = require("../../util/scrape");

router.post("/query", async (req, res) => {
  const keyWords = req.body.keyWords;

  let data = {};

  for (let index = 0; index < keyWords.length; index++) {
    data[keyWords[index]] = (await scraper.scrape(keyWords[index])) || "hmm";
  }

  return res.json(data);
});

router.post("/get", async (req, res) => {
  const tags = req.body.tags;
  if (!tags) {
    const pins = await Pin.find();

    res.json(pins);
  }
});

module.exports = router;
