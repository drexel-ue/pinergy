// At the top of the file, import Mongoose. We will also need to require the Mongoose Schema:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Now, let's think ahead to the information we need to require from a user and setup our schema:
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  interests: {
    type: Array,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  boards: {
    type: Array,
    default: []
  },
  profilePhotoUrl: {
    type: String,
    default: "https://i.imgur.com/AItCxSs.jpg"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Let's not forget to export our model.
module.exports = User = mongoose.model("users", UserSchema);
