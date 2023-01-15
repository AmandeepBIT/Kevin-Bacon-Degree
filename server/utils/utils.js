(function () {
  'use strict'
  // Handling the success and error based methods with status codes
  var responseBack = {
    successHandler: function (res, statusCode, next, message) {
      res.status(statusCode).send({
        status: 1,
        response: message,
      })
      res.end()
      next()
    },
    errorHandler: function (res, statusCode, next, message) {
      res.status(statusCode).send({
        status: 0,
        error: message,
      })
      res.end()
      next()
    },
  }
  module.exports = responseBack
})()
