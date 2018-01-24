# pushstate-server

Static file server that works with HTML5 Pushstate.

For example, the route ` /some/pushstate/route ` will return the ` index.html ` file. But, ` /some/static/path/logo.png ` will return the ` logo.png ` static file.

## Install

```
npm install pushstate-server --save
```

## Usage

```js
var server = require('pushstate-server');

server.start({
  port: 3000,
  directory: './public'
});
```

or for https connection

```js
var server = require('pushstate-server');

server.start({
  port: 4200,
  directory: './public',
  useSSL: true,
  sslKeyPath: './server.key',
  sslCertPath: './server.crt'
});
```

or for multiple directories

```js
var server = require('pushstate-server');

server.start({
  port: 4200,
  directories: ['./public', './bower_components']
});
```

or bind to a particular host

```js
server.start({
  port: 4200,
  host: '192.99.100.01',
  directories: ['./public', './bower_components']
});
```


## Global Install

```
npm install -g pushstate-server
```

```
usage: pushstate-server [-d directory] [-p port] [-f file] [-s -c path/to/server.crt -k path/to/server.key]
```

## API

#### start(options[, callback])
* start the pushstate static file server

##### options

* `port`
  * set the port that the server should open
  * uses ` process.env.PORT ` if not specified, and defaults to port ` 9000 ` if none is available
* `directory`
  * the path to the directory where the static assets will be served
  * defaults to ` public `
* `file`
  * Custom file to serve
  * defaults to `index.html`
* `useSSL`
  * Let the server use HTTPS instead of HTTP
  * defaults to `false`
* `sslKeyPath`
  * Path for the SSL private key
* `sslCertPath`
  * Path for the SSL certificate
