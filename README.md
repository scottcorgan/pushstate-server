# pushstate-server

Static file server that works with HTML5 Pushstate.

Defaults all routes to ` index.html ` in the directory set by ` setDirectory() `. Treats the following file extensions as static files (non routeables):

* html
* js
* json
* csv
* css
* less
* png
* svg
* eot
* ttf
* woff
* appcache
* jpg
* jpeg
* gif
* ico

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
  directory: './public',
  file: '/index.html'
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

## Global Install

```
npm install -g pushstate-server
```

```
usage: pushstate-server [directory] [port] [file]
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
* `file`
  * the file route to
  * defaults to ` /index.html `
  * optionally use `server.file()`
