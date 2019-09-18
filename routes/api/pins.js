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

router.post("/createpin", (req, res) => {
  // debugger;
  let imageUrl;
  debugger;
  if (req.body.type === "image") {
    imagUrl = singleUpload(req, res, err => {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "File type error", detail: err.message }]
        });
      }
      const image = new Image({
        url: req.file.location
      });

      image.save().then(res2 => {

        const pin = new Pin({
          user: req.body.id,
          board: req.body.board,
          // image: req.image,
          url: res2.url,
          title: req.body.title,
          description: req.body.description,
          destinationLink: req.body.destinationLink,
          // tags: [board.title]
        });
        pin.save().then(pin => {
          debugger;
          res.json(pin);
        });

        // return res.json({ imageUrl: res2.url, id: res2.id });
      });
      // debugger
      // res.json(imageUrl)
    });
  }
  

});

router.post("/get", async (req, res) => {
  const tags = req.body.tags;
  if (tags.length === 0) {
    const pins = await Pin.find();

    res.json(pins);
  }
});

module.exports = router;
