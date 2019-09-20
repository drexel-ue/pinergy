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

const scraper = require("../../util/scrape");

router.post("/query", async (req, res) => {
  const keyWords = req.body.keyWords;

  let data = {};

  for (let index = 0; index < keyWords.length; index++) {
    // data[keyWords[index]] = (await scraper.scrape(keyWords[index])) || "hmm";
  }

  return res.json(data);
});

router.post("/scrape", async (req, res) => {
  const urls = await scraper(req.body.url);
});

router.post("/createpin", async (req, res) => {
  // debugger
  let pin;
  if (req.body.data.scrapedImageUrl) {
    const image = await new Image({
      url: req.body.data.scrapedImageUrl
    });
    image.save().then(res2 => {
      // debugger
      pin = new Pin({
        user: req.body.data.id,
        board: req.body.data.boardId,
        image: res2.id,
        url: res2.url,
        title: req.body.data.title,
        description: req.body.data.description,
        destinationLink: req.body.data.destinationLink
        // tags: [board.title]
      });
      pin.save().then(pin => {
        // debugger
        res.json(pin);
      });
    });
  } else {
    // debugger
    pin = new Pin({
      user: req.body.data.id,
      board: req.body.data.boardId,
      image: req.body.data.image,
      url: req.body.data.url,
      title: req.body.data.title,
      description: req.body.data.description,
      destinationLink: req.body.data.destinationLink
      // tags: [board.title]
    });
    pin.save().then(pin => {
      res.json(pin);
    });
  }
  // debugger;
  // pin.save().then(pin => {
  //   res.json(pin);
  // });
});

router.post("/get", async (req, res) => {
  const tags = req.body.tags;
  if (tags.length === 0) {
    const pins = await Pin.find();

    res.json(pins);
  }
});

module.exports = router;
