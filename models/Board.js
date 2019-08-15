// At the top of the file, import Mongoose. We will also need to require the Mongoose Schema:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Now, let's think ahead to the information we need to require from a user and setup our schema:
const BoardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  coverPhotoUrl: {
    type: String,
    required: false
  },
  public: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    required: false
  },
  pins: {
    type: Array,
    default: []
  },
  collaborators: {
    type: Array,
    default: []
  },
  sections: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Let's not forget to export our model.
module.exports = Board = mongoose.model("boards", BoardSchema);
