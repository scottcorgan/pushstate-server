pushstate-server
================

Static file server that works with HTML5 Pushstate.

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

#### setDirectory(dir)
* the path to the directory where the static assets will be served from


## Test

```
npm test
```
