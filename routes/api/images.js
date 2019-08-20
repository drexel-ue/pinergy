const express = require("express");
const router = express.Router();
const upload = require('../../util/aws-upload');
const singleUpload = upload.single('image');
const Image = require('../../models/Image')



router.post('/image-upload', function (req, res) {
  
  singleUpload(req, res,  function (err) {
    if (err) {
      return res.status(422).send({errors: [{title: "File type error", detail: err.message}]})
    }
    // debugger 
    return res.json({'imageUrl': req.file.location})
  })
})


module.exports = router;