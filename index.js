let connect = require('connect')
let modRewrite = require('connect-modrewrite')
let serveStatic = require('serve-static')
let compression = require('compression')
let app = connect()

module.exports = {
  app: app,
  _port: 9000,
  _directory: 'public',
  _file: '/index.html',

  port: function (port) {
    this._port = port
  },

  directory: function (dir) {
    this._directory = dir
  },

  file: function (file) {
    this._file = dir
  },

  start: function (options, _onStarted) {
    options = options || {}

    let port = options.port || process.env.PORT || this._port
    let directory = options.directory || this._directory
    let directories = options.directories || [directory]
    let file = options.file || this._file
    let onStarted = _onStarted || function () {}

    app.use(modRewrite([
      '!\\.html|\\.js|\\.json|\\.ico|\\.csv|\\.css|\\.less|\\.png|\\.svg' +
      '|\\.eot|\\.otf|\\.ttf|\\.woff|\\.woff2|\\.appcache|\\.jpg|\\.jpeg' +
      '|\\.gif|\\.webp|\\.mp4|\\.txt|\\.map|\\.webm ' + file + ' [L]'
    ]))
    app.use(compression())

    directories.forEach(function(directory) {
      app.use(serveStatic(directory))
    })

    return app.listen(port, function (err) {
      onStarted(err)
    })
  }
}
