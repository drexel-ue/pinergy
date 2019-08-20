const mongoose = require("mongoose");
// This creates a new Express server.
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
// Imports created routes.
const users = require("./routes/api/users");
const pins = require("./routes/api/pins");
const boards = require("./routes/api/boards");
// Allows us to parse the json sent to the front end.
const bodyParser = require("body-parser");
// Verifies incoming request tokens to project routes.
const passport = require("passport");
require("./config/passport")(passport);
const path = require("path");

// Sets up connection to MondoDB.
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Tells the server which potrt to run on.
const port = process.env.PORT || 5000;

// Sets up a basic route so that we can render some information on our page.
app.get("/", (req, res) => res.send("Coco Puffs"));

// Sets passport as the bouncer.
app.use(passport.initialize());

// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json.
app.use(bodyParser.json());

// We must tell Express to use imported routes.
app.use("/api/users", users);
app.use("/api/pins", pins);
app.use("/api/boards", boards);

// Tells Express to start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Tells our server to load the static build folder in production.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
