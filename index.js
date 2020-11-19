"use strict";

const connect = require("connect");
const path = require("path");
const serveStatic = require("serve-static");
const serveStaticFile = require("connect-static-file");
const compression = require("compression");
const fs = require("fs");
const https = require("https");
const app = connect();

const PORT = 9000;
const DIRECTORY = "public";
const FILE = "index.html";
const HOST = "0.0.0.0";

exports.start = function(options, _onStarted) {
  options = options || {};

  let port = options.port || process.env.PORT || PORT;
  let directory = options.directory || DIRECTORY;
  let directories = options.directories || [directory];
  let file = options.file || FILE;
  let host = options.host || HOST;
  let useSSL = options.useSSL || false;
  let onStarted = _onStarted || function() {};

  let https_options = useSSL
    ? {
        key: fs.readFileSync(options.sslKeyPath),
        cert: fs.readFileSync(options.sslCertPath)
      }
    : null;

  app.use(compression());

  // First, check the file system
  directories.forEach(directory =>
    app.use(serveStatic(directory, { extensions: ["html"] }))
  );

  // Then, serve the fallback file
  app.use(serveStaticFile(path.join(directory, file)));

  if (useSSL) {
    const server = https
      .createServer(https_options, app)
      .listen(port, host, err => onStarted(err, server.address()));

    return server;
  } else {
    const server = app.listen(port, host, err =>
      onStarted(err, server.address())
    );

    return server;
  }
};
