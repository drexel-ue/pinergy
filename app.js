const express = require("express");
const app = express();
const users = require("./routes/api/users");

app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
