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
    // data[keyWords[index]] = (await scraper.scrape(keyWords[index])) || "hmm";
  }

  return res.json(data);
});

router.post("/scrape", async (req, res) => {
  const urls = await scraper(req.body.url);
});

router.post("/createpin", async (req, res) => {
  let pin;
  if (req.body.data.scrapedImageUrl) {
    const image = await new Image({
      url: req.body.data.scrapedImageUrl
    });
    image.save().then(res2 => {
      if (req.body.data.boardId) {
        pin = new Pin({
          user: req.body.data.id,
          board: req.body.data.boardId,
          image: res2.id,
          url: res2.url,
          title: req.body.data.title,
          description: req.body.data.description,
          destinationLink: req.body.data.destinationLink
        });
      } else {
        pin = new Pin({
          user: req.body.data.id,
          image: res2.id,
          url: res2.url,
          title: req.body.data.title,
          description: req.body.data.description,
          destinationLink: req.body.data.destinationLink
        })
      }
      
      pin.save().then(async pin => {
        if (req.body.data.boardId) {
          const board = await Board.findById(req.body.data.boardId);
          board.pins.push(pin.id);
          board.save();
        }
        res.json(pin);
      });
    });
  } else {
    if (req.body.data.boardId) {
      pin = new Pin({
        user: req.body.data.id,
        board: req.body.data.boardId,
        image: req.body.data.image,
        url: req.body.data.url,
        title: req.body.data.title,
        description: req.body.data.description,
        destinationLink: req.body.data.destinationLink
      });
    } else {
      pin = new Pin({
        user: req.body.data.id,
        image: req.body.data.image,
        url: req.body.data.url,
        title: req.body.data.title,
        description: req.body.data.description,
        destinationLink: req.body.data.destinationLink
      });
      }
    
    pin.save().then(async pin => {
      if (req.body.data.boardId) {
        const board = await Board.findById(req.body.data.boardId);
        board.pins.push(pin.id);
        board.save();
      }
      res.json(pin);
    });
  }
});

router.post("/get", async (req, res) => {
  const tags = req.body.tags;
  if (tags.length === 0) {
    const pins = await Pin.aggregate([
      {
        $sample: { size: 200 }
      }
    ]);
    res.json(pins);
  }
});

router.post("/getpreviews", async (req, res) => {
  const foundthumbPins = await Pin.find({ board: req.body.boardId }).limit(4);
  res.json(foundthumbPins);
});

router.post("/getpins", async (req, res) => {
  const pins = await Pin.find({ board: req.body.boardId });
  res.json(pins);
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
    const userId = req.body.userId;
    const boardId = req.body.boardId;
    const pin = req.body.pin;
    delete pin._id;
    delete pin.user;
    pin.date = Date.now();
    const user = await User.findById(userId);
    pin.user = user;
    const image = await Image.findById(pin.image._id);
    const board = await Board.findById(boardId).populate("pins");
    pin.board = board;
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
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
