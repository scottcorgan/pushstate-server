'use strict'

var connect = require('connect')
var path = require('path')
var serveStatic = require('serve-static')
var serveStaticFile = require('connect-static-file')
var compression = require('compression')
var app = connect()

const PORT = 9000
const DIRECTORY = 'public'
const FILE = 'index.html'

exports.start = function (options, _onStarted) {
  options = options || {}

  let port = options.port || process.env.PORT || PORT
  let directory = options.directory || DIRECTORY
  let directories = options.directories || [directory]
  let file = options.file || FILE
  let onStarted = _onStarted || function () {}

  app.use(compression())

  // First, check the file system
  directories.forEach(function(directory) {
    app.use(serveStatic(directory, { extensions: ['html'] }))
  })

  // Then, serve the fallback file
  app.use(serveStaticFile(path.join(directory, file)))

  return app.listen(port, function (err) {
    onStarted(err, port)
  })
}
