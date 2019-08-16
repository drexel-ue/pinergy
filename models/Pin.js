// At the top of the file, import Mongoose. We will also need to require the Mongoose Schema:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Now, let's think ahead to the information we need to require from a user and setup our schema:
const PinSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "boards",
    required: false
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: "section",
    required: false
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "images"
  },
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  destinationLink: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    default: []
  },
  repins: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Let's not forget to export our model.
module.exports = Board = mongoose.model("pins", PinSchema);
