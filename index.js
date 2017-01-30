'use strict'

var connect = require('connect')
var path = require('path')
var serveStatic = require('serve-static')
var serveStaticFile = require('connect-static-file')
var compression = require('compression')
var log4js = require('log4js')
var app = connect()

const PORT = 9000
const DIRECTORY = 'public'
const FILE = 'index.html'
const HOST = '0.0.0.0'
const LOGGEROPTIONS = {
  level: 'ALL',
  appenders: [ { type: 'console' } ]
}

exports.start = function (options, _onStarted) {
  options = options || {}

  let port = options.port || process.env.PORT || PORT
  let directory = options.directory || DIRECTORY
  let directories = options.directories || [directory]
  let file = options.file || FILE
  let host = options.host || HOST
  let loggerOptions = options.logger || LOGGEROPTIONS
  let onStarted = _onStarted || function () {}

  app.use(compression())

  // configure logger
  log4js.configure(loggerOptions)
  const logger = log4js.getLogger()
  logger.setLevel(loggerOptions.level)
  app.use(log4js.connectLogger(logger, { level: log4js.levels[loggerOptions.level] }))

  // check the file system
  directories.forEach(function(directory) {
    app.use(serveStatic(directory, { extensions: ['html'] }))
  })

  // serve the fallback file
  app.use(serveStaticFile(path.join(directory, file)))

  return app.listen(port, host, function (err) {
    onStarted(err, port)
  })
}
