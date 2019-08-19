const express = require("express");
const router = express.Router();
const upload = require('../../util/aws-upload');
const singleUpload = upload.single('image');




router.post('/image-upload', function (req, res) {
  
  singleUpload(req, res, function (err) {
    
    return res.json({'imageUrl': req.file.location})
  });
})

module.exports = router;