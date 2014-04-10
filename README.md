pushstate-server
================

Static file server that works with HTML5 Pushstate.

Defaults all routes to ` index.html ` in the directory set by ` setDirectory() `. Treats the following file extensions as static files (non routeables):

* html
* js
* css
* png
* svg
* eot
* ttf
* woff

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

## Adding Middleware

It is possible to add middleware. For example, to add an instance of [Canned](https://github.com/sideshowcoder/canned), would look as follows:

```js
var server = require('pushstate-server');

var canned = require('canned'),
    http = require('http');

var can = canned('/api', {});

server.start({
  port: 5000,
  directory: __dirname + '/static',
  apps: [can]
});
```

## API

#### start(options)
* start the pushstate static file server

##### options

* `port` 
  * set the port that the server should open
  * uses ` process.env.PORT ` if not specified, and defaults to port ` 9000 ` if none is available
  * * optionally use `server.port()`
* `directory`
  * the path to the directory where the static assets will be served
  * defaults to ` public `
  * optionally use `server.directory()`

## Run Tests

```
npm install
npm test
```
