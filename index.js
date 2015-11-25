var connect = require('connect');
var modRewrite = require('connect-modrewrite');
var serveStatic = require('serve-static');
var compression = require('compression');
var app = connect();

module.exports = {
  app: app,
  _port: 9000,
  _directory: 'public',
  _file: '/index.html',

  port: function (port) {
    this._port = port;
  },

  directory: function (dir) {
    this._directory = dir;
  },

  file: function (file) {
    this._file = dir;
  },

  start: function (options) {
    options = options || {};

    var port = options.port || process.env.PORT || this._port;
    var directory = options.directory || this._directory;
    var directories = options.directories || [directory];
    var file = options.file || this._file;

    app.use(modRewrite([
      '!\\.html|\\.js|\\.json|\\.ico|\\.csv|\\.css|\\.less|\\.png|\\.svg|\\.eot|\\.ttf|\\.woff|\\.appcache|\\.jpg|\\.jpeg|\\.gif ' + file + ' [L]'
    ]));
    app.use(compression());

    directories.forEach(function(directory) {
      app.use(serveStatic(directory));
    });

    app.listen(port, function () {
      console.log('\nPushstate server started on port ' + port + '\n');
    });
  }
};
