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
const Board = require("../../models/Board");
// For validating tokens.
const passport = require("passport");
// Validates registration form.
const validateRegisterInput = require("../../validation/register");
// Validates login form.
const validateLoginInput = require("../../validation/login");
// Validates updates.
const validateUpdate = require("../../validation/update_user");

const scraper = require("../../util/scrape");

router.get("/boards", async (req, res) => {
  //    user= User.findById(req.params.id)
  const boards = await Board.find();
  res.json(boards);
});
