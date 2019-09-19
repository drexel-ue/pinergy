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
const upload = require("../../util/aws-upload");
const singleUpload = upload.single("image");
const Image = require("../../models/Image");
const Board = require("../../models/Board");

const scraper = require("../../util/scrape");

router.post("/query", async (req, res) => {
  const keyWords = req.body.keyWords;

  let data = {};

  for (let index = 0; index < keyWords.length; index++) {
    data[keyWords[index]] = (await scraper.scrape(keyWords[index])) || "hmm";
  }

  return res.json(data);
});

router.post("/createpin", async function(req, res) {
  // debugger
  let imageUrl;
  if (req.params.type === "image") {
    imagUrl = await singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "File type error", detail: err.message }]
        });
      }
      debugger;
      return req.file.location;
      // debugger
      // res.json(imageUrl)
    });
  } else {
    // debugger
    imageUrl = req.body.inputUrl;
  }
  const img = new Image({
    url: imageUrl
  });
  debugger;
  img.save().then(img => {
    debugger;
    const pin = new Pin({
      user: req.body.id,
      board: req.body.board,
      image: img.id,
      url: img.url,
      title: req.body.title,
      description: req.body.description,
      destinationLink: req.body.destinationLink
      // tags: [board.title]
    });
    pin.save().then(pin => {
      debugger;
      res.json(pin);
    });
  });
});

router.post("/get", async (req, res) => {
  const tags = req.body.tags;
  if (tags.length === 0) {
    const pins = await Pin.find().limit(20);
    res.json(pins);
  }
});

router.post("/fetch", async (req, res) => {
  const id = req.body.id;
  const pin = await Pin.findById(id).populate("image");
  if (pin) {
    res.json(pin);
  } else {
    res.json({ error: "no pin found" }).status(404);
  }
});

router.post("/repin", async (req, res) => {
  try {
    const boardId = req.body.boardId;
    const pin = req.body.pin;
    const image = await Image.findById(pin.image._id);
    const board = await Board.findById(boardId);
    const repin = new Pin(pin);
    image.pins.push(repin);
    board.pins.push(repin);
    await Promise.all([image.save(), repin.save(), board.save()]);

    res.json({
      pin,
      image,
      repin,
      board
    });
  } catch (e) {
    res.json({ error: "could not repin" });
  }
});

module.exports = router;
