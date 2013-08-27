var connect = require('connect');
var modRewrite = require('connect-modrewrite');
var _ = require('lodash');
var app = connect();

//
module.exports = {
  _port: 9000,
  _directory: 'public',
  
  setPort: function (port) {
    this._port = port;
  },
  
  setDirectory: function (dir) {
    this._directory = dir;
  },
  
  start: function () {
    var self = this;
    var port = process.env.PORT || this._port;
    
    app.use(modRewrite([
      '!\\.html|\\.js|\\.css|\\.png|\\.svg|\\.eot|\\.ttf|\\.woff /index.html [L]'
    ]));
    app.use(connect.compress());
    app.use(connect.static(this._directory));
    
    app.listen(port, function () {
      console.log('\nPushstate server started on port ' + port + '\n');
    });
  }
};