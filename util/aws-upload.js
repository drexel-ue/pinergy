var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const config = require('../config/keys_dev')
aws.config.update({
  secretAccessKey: config.awsSecretKey,
  accessKeyId: config.awsAccessKey,
  region: config.awsRegion
})
var s3 = new aws.S3()

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pinergyimages',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;