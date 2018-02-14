var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');

var s3 = new AWS.S3('../s3_config.json');

var myBucket = 'business_images';