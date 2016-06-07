var tape = require('tape');
var server = require('../index');

var extra_rules = ['^/login$ /login.html',
                   '^/google/(.*) http://google.com?q=$1 [R]'];

server.start({ extra_rules: extra_rules });