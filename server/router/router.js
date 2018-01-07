const Users = require('./../models/users')
var formidable = require('formidable')

exports.doLogin = function (req, res, next) {
  var form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
      console.log(fields)
      console.log(files)
  })
}

exports.doRegist = function (req, res, next) {
  var form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    console.log(fields)
    console.log(files)
  })
}


