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
  _extra_rules: [],

  port: function (port) {
    this._port = port;
  },

  directory: function (dir) {
    this._directory = dir;
  },

  file: function (file) {
    this._file = dir;
  },

  extra_rules: function (extra_rules) {
    this._extra_rules = extra_rules;
  },

  start: function (options) {
    options = options || {};

    var port = options.port || process.env.PORT || this._port;
    var directory = options.directory || this._directory;
    var directories = options.directories || [directory];
    var file = options.file || this._file;
    var extra_rules = options.extra_rules || this._extra_rules;
    var mod_rewrite_rules = [
      '!\\.html|\\.js|\\.json|\\.ico|\\.csv|\\.css|\\.less|\\.png|\\.svg|\\.eot|\\.ttf|\\.woff|\\.appcache|\\.jpg|\\.jpeg|\\.gif ' + file + ' [L]'
    ];

    if (extra_rules) {
      if (extra_rules.constructor !== Array) {
        throw new TypeError('extra_rules must be an array');
      }
      if (extra_rules.length > 0) {
        mod_rewrite_rules = extra_rules.concat(mod_rewrite_rules);
      }
    }

    app.use(modRewrite(mod_rewrite_rules));
    app.use(compression());

    directories.forEach(function(directory) {
      app.use(serveStatic(directory));
    });

    app.listen(port, function () {
      console.log('\nPushstate server started on port ' + port + '\n');
    });
  }
};
