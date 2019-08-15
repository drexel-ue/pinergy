// At the top of the file, import Mongoose. We will also need to require the Mongoose Schema:
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Now, let's think ahead to the information we need to require from a user and setup our schema:
const SectionSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "boards"
  },
  title: {
    type: String,
    required: true
  },
  pins: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Let's not forget to export our model.
module.exports = Section = mongoose.model("boards", SectionSchema);
