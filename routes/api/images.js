const express = require("express");
const router = express.Router();
const upload = require("../../util/aws-upload");
const singleUpload = upload.single("image");
const Image = require("../../models/Image");

router.post("/image-upload", function(req, res) {
  // debugger
  singleUpload(req, res, function(err) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "File type error", detail: err.message }] });
    }
    // debugger
    const image = new Image({
      url: req.file.location
    });

    image.save().then(res2 => {
      return res.json({ imageUrl: res2.url, id: res2.id})
    });
    // debugger
    // return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
