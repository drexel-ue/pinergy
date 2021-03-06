const faker = require("faker");
const User = require("../models/User");
const Board = require("../models/Board");
const Image = require("../models/Image");
const Pin = require("../models/Pin");
const bcrypt = require("bcryptjs");
const db = require("../config/keys").mongoURI;
const mongoose = require("mongoose");
const boardTitles = require("./board_titles");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(async () => {
    console.log("Connected to MongoDB successfully");

    const demoUserData = {
      email: "DemoUser@Pinergy.com",
      password: "test123",
      password2: "test123",
      username: "DemoUser",
      age: 09380298
    };

    let demoUser = await User.findOne({ email: "DemoUser@Pinergy.com" });

    let boards = [];
    let images = [];
    let users = [];
    let pins = [];
    const fakeTitles = [
      faker.commerce.productAdjective(),
      faker.company.bsNoun(),
      faker.hacker.adjective()
    ];
    const fakeDescriptions = [
      faker.company.catchPhrase(),
      faker.hacker.phrase()
    ];

    if (!demoUser) {
      demoUser = new User(demoUserData);
      const salt = await bcrypt.genSalt();
      demoUser.password = await bcrypt.hash("test123", salt);
      users.push(demoUser);
      for (let boardIndex = 0; boardIndex < 12; boardIndex++) {
        const board = new Board({
          user: demoUser,
          title:
            boardTitles[Math.round(Math.random() * (boardTitles.length - 1))]
        });
        boards.push(board);
        demoUser.boards.push(board);
        let usedHeights = [];
        determineHeight = () => {
          let height = Math.round(Math.random() * 400 + 100);
          if (usedHeights.includes(height)) {
            height = determineHeight();
          }
          usedHeights.push(height);
          return height;
        };
        for (let pinImageIndex = 0; pinImageIndex < 30; pinImageIndex++) {
          const height = determineHeight();
          const image = new Image({
            url: `https://picsum.photos/240/${height}?random=1`
          });
          images.push(image);
          const pin = new Pin({
            user: demoUser,
            board: board,
            image: image,
            url: image.url,
            title:
              fakeTitles[
                faker.random.number({ min: 0, max: fakeTitles.length - 1 })
              ],
            description:
              fakeDescriptions[
                faker.random.number({
                  min: 0,
                  max: fakeDescriptions.length - 1
                })
              ],
            destinationLink: image.url,
            tags: [board.title]
          });
          pins.push(pin);
          board.pins.push(pin);
          image.pins.push(pin);
        }
      }
      console.log("demo user generated");
    }

    for (let userIndex = 0; userIndex < 100; userIndex++) {
      let user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: "test123",
        password2: "test123",
        email: faker.internet.email(),
        age: Math.round(Math.random() * 999999999999),
        profilePhotoUrl: faker.internet.avatar()
      });
      users.push(user);
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash("test123", salt);
      for (let boardIndex = 0; boardIndex < 12; boardIndex++) {
        const board = new Board({
          user: user.id,
          title:
            boardTitles[Math.round(Math.random() * (boardTitles.length - 1))]
        });
        boards.push(board);

        let usedHeights = [];
        determineHeight = () => {
          let height = Math.round(Math.random() * 400 + 100);
          if (usedHeights.includes(height)) {
            height = determineHeight();
          }
          usedHeights.push(height);
          return height;
        };
        for (let pinImageIndex = 0; pinImageIndex < 30; pinImageIndex++) {
          const height = determineHeight();
          const image = new Image({
            url: `https://picsum.photos/240/${height}?random=1`
          });
          images.push(image);
          const pin = new Pin({
            user: user.id,
            board: board.id,
            image: image.id,
            url: image.url,
            title:
              fakeTitles[
                faker.random.number({ min: 0, max: fakeTitles.length - 1 })
              ],
            description:
              fakeDescriptions[
                faker.random.number({
                  min: 0,
                  max: fakeDescriptions.length - 1
                })
              ],
            destinationLink: image.url,
            tags: [board.title]
          });
          pins.push(pin);
          board.pins.push(pin);
          image.pins.push(pin);
        }
      }
      console.log("user", userIndex + 1);
    }

    console.log("commencing user inserts");
    await User.insertMany(users);
    console.log("users seeded");

    console.log("commencing board inserts");
    await Board.insertMany(boards);
    console.log("boards seeded");

    console.log("commencing image inserts");
    await Image.insertMany(images);
    console.log("images seeded");

    console.log("commencing pin inserts");
    await Pin.insertMany(pins);
    console.log("pins seeded");

    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
