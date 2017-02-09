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

or add some middleware

```js
server.start({
  middleware: [
    someMiddleware,
    ['/route', someRouteSpecificMiddleware ]
  ]
});
```


## Global Install

```
npm install -g pushstate-server
```

```
usage: pushstate-server [directory] [port]
```

## API

#### start(options)
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
* `middleware`
  * array of middleware to use; each array element can be a function or an array of arguments for [`connect`'s `use` method](https://github.com/senchalabs/connect#use-middleware)
  * defaults to `[]`
