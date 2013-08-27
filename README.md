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

```javascript

var server = require('pushstate-server');

// Optional
server.setPort(3000);
server.setDirectory('./public');

// Required
server.start();

```

## API

#### start()
* start the pushstate static file server

#### setPort(port)
* set the port that the server should open
* uses ` process.env.PORT ` if not specified, and defaults to port ` 9000 ` if none is available

#### setDirectory(dir)
* the path to the directory where the static assets will be served from
* defaults to ` public `


## Test

*(does nothing at the moment)*

```
npm test
```
