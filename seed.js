const faker = require("faker");
const User = require("./models/User");
const Board = require("./models/Board");
const Image = require("./models/Image");
const Pin = require("./models/Pin");
const bcrypt = require("bcryptjs");
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");

const boardTitles = [
  "Home Decor",
  "Food and Drink",
  "Hair and Beauty",
  "Humor",
  "Education",
  "Art",
  "Quotes",
  "Travel",
  "Design",
  "DIY Home Decor",
  "Animals",
  "Makeup",
  "HairStyles",
  "Recipes",
  "Braids",
  "Health and Fitness",
  "Photography",
  "Gardening",
  "Weddings",
  "Furniture",
  "Fitness",
  "Ab Workouts",
  "Geek Culture",
  "History",
  "Abandoned Mansions",
  "Nails",
  "Woodworking",
  "Grilling Recipes",
  "Technology",
  "Tattoos and Bodyart",
  "Eye Makeup",
  "Survival Skills",
  "Fashion",
  "Inspiration Quotes",
  "Memes",
  "Skin Care",
  "DIY Christmas Gifts",
  "Celebrities",
  "Desserts",
  "Gadgets",
  "Christmas",
  "Backyard Ideas",
  "Architecture",
  "Shoes",
  "DIY and Crafts",
  "Life Quotes",
  "Sports Cars",
  "Home Renovation",
  "Pranks",
  "Camping",
  "Country Weddings",
  "Disney",
  "Black Hairstyles",
  "Birthdays",
  "Christmas Decor",
  "Cats",
  "Long Hair",
  "Star Wars",
  "Easy Crafts",
  "DIY Gifts",
  "Kittens",
  "Sandwich Ideas",
  "Short Hairstyle",
  "Emo Fashion",
  "DIY Home Crafts",
  "Luxury Cars",
  "Casual Outfits",
  "Christmas Crafts",
  "Healthy Snacks",
  "Cheer",
  "American History",
  "Nutrition",
  "Bedroom Ideas",
  "Dresses",
  "Drawings",
  "Teen Girl Bedrooms",
  "Crafts for Kids",
  "Relationships",
  "Clean Eating",
  "Nascar",
  "Crafts",
  "Parenting",
  "Baby Showers",
  "Landscapings",
  "Jordans",
  "Gift",
  "Ideas",
  "Cocktail",
  "Girl Rooms",
  "Walking Dead",
  "Vintage",
  "Yoga",
  "Garden Design",
  "Urban Gardening"
];

const fakeImageUrls = [
  faker.image.abstract(),
  faker.image.animals(),
  faker.image.business(),
  faker.image.cats(),
  faker.image.city(),
  faker.image.food(),
  faker.image.nightlife(),
  faker.image.fashion(),
  faker.image.people(),
  faker.image.nature(),
  faker.image.sports(),
  faker.image.transport()
];

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");

    const demoUser = {
      email: "DemoUser@Pinergy.com",
      password: "test123",
      password2: "test123",
      username: "DemoUser",
      age: 09380298
    };

    User.findOne({ email: "DemoUser@Pinergy.com" }).then(user => {
      if (!user) {
        const newUser = new User(demoUser);
        bcrypt.genSalt(10, (error, salt) => {
          // Throw an error if there is one.
          if (error) throw error;
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            // Throw an error if there is one.
            if (error) throw error;
            // Set the newUser object's password to the salted password (hash).
            newUser.password = hash;
            newUser
              // Save the new user document to the database.
              .save()
              // Log any errors.
              .catch(error => console.log(error));
          });
        });
      }
    });

    for (let userIndex = 0; userIndex < 5; userIndex++) {
      let newUser = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.name.jobDescriptor(),
        password: "test123",
        email: faker.internet.email(),
        age: Math.round(Math.random() * 999999999999),
        location: faker.locale,
        profilePhotoUrl: faker.internet.avatar()
      });

      bcrypt.genSalt(10, (error, salt) => {
        if (error) throw error;
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              for (let boardIndex = 0; boardIndex < 10; boardIndex++) {
                const board = new Board({
                  user: user.id,
                  title:
                    boardTitles[
                      Math.round(Math.random() * (boardTitles.length - 1))
                    ]
                });
                board.save().then(board => {
                  for (
                    let pinImageIndex = 0;
                    pinImageIndex < 30;
                    pinImageIndex++
                  ) {
                    const index = Math.round(
                      Math.random() * (fakeImageUrls.length - 1)
                    );
                    const image = new Image({
                      url: fakeImageUrls[index]
                    });
                    image.save().then(image => {
                      const pin = new Pin({
                        user: user.id,
                        board: board.id,
                        image: image.id,
                        url: image.url,
                        title: faker.lorem.words(3),
                        description: faker.lorem.paragraph(3),
                        destinationLink: image.url,
                        tags: [board.title]
                      });
                      pin.save().then(pin => {
                        if (userIndex === 4) mongoose.connection.close();
                      });
                    });
                  }
                });
              }
            })
            .catch(e => console.log(e));
        });
      });
    }
  })
  .catch(err => console.log(err));
