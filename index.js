var connect = require('connect');
var modRewrite = require('connect-modrewrite');
var serveStatic = require('serve-static');
var compression = require('compression');
var app = connect();

//
module.exports = {
  _port: 9000,
  _directory: 'public',

  port: function (port) {
    this._port = port;
  },

  directory: function (dir) {
    this._directory = dir;
  },

  start: function (options) {
    options = options || {};

    var port = process.env.PORT || options.port || this._port;
    var directory = options.directory || this._directory;

    app.use(modRewrite([
      '!\\.html|\\.js|\\.css|\\.png|\\.svg|\\.eot|\\.ttf|\\.woff|\\.appcache|\\.jpg|\\.jpeg /index.html [L]'
    ]));
    app.use(compression());
    app.use(serveStatic(directory));

    app.listen(port, function () {
      console.log('\nPushstate server started on port ' + port + '\n');
    });
  }
};
