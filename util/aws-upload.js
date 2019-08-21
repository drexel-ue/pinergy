var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const config = require('../config/keys')
aws.config.update({
  secretAccessKey: config.awsSecretKey,
  accessKeyId: config.awsAccessKey,
  region: config.awsRegion
})
var s3 = new aws.S3()

const fileFilter = (req, file, cb) => { 
  // debugger
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false)
  }
}

var upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'pinergyimages',
    // acl:'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;