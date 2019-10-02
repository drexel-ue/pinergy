const express = require("express");
const router = express.Router();
const upload = require("../../util/aws-upload");
const singleUpload = upload.single("image");
const Image = require("../../models/Image");
const scrape = require("../../util/scrape").scrape;
router.post("/image-upload", function(req, res) {
  singleUpload(req, res, function(err) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "File type error", detail: err.message }] });
    }
    const image = new Image({
      url: req.file.location
    });
    image.save().then(res2 => {
      return res.json({ imageUrl: res2.url, id: res2.id });
    });
    // return res.json({ imageUrl: req.file.location });
  });
});
// TODO: code underneat prior to fix wasnt returning anything
// when writtne line 29 as "return url"
// fixed by res.json-ing return value
router.post("/scrape", async (req, res) => {
  try {
    const urls = await scrape(req.body.url);

    return res.json({ urls: urls });
  } catch (err) {
    res.json({ err: err });
  }
});

module.exports = router;
