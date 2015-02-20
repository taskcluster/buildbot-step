#! /usr/bin/env node

var spawn = require('child_process').spawn;
var argv = process.argv;
var format = require('util').format;

var BB_LINE = '========= %s =========';

function padZero(input, pad) {
  pad = pad || 2;
  input = String(input)
  if (input.length < pad) {
    return '0' + input;
  }
  return input;
}

function ensureLength(input, len) {
  input = String(input);
  if (input.length < len) {
    var missing = len - input.length;
    for (var i = 0; i < missing; i++) {
      input = input + '0';
    }
    return input;
  }

  if (input.length > len) {
    return input.slice(0, 6);
  }

  return input;
}

function status(type, step, code, duration) {
  var line = '%s %s (results: %s, elapsed: %d secs) (at %s)'
  var date = new Date();

  // Time shown in UTC to be the least confusing...
  var dateFormat = format(
    '%s-%s-%s %s:%s:%s.%s',
    date.getUTCFullYear(),
    padZero(date.getMonth()),
    padZero(date.getDate()),
    padZero(date.getHours()),
    padZero(date.getMinutes()),
    padZero(date.getSeconds()),
    ensureLength(date.getMilliseconds(), 6)
  );
  console.log(format(BB_LINE, format(
    line,
    type,
    step,
    code,
    Math.ceil(duration),
    dateFormat
  )))
}

var title = argv[3];
var command = argv.slice(3);

if (!title || !command.length) {
  console.error(format(
    'Error missing title or command\n ' +
    'Usage: %s <title> <command...>',
    argv[1]
  ));
  process.exit(1);
}

var start = Date.now();

status('Started', argv.slice(2).join(' '), 0, 0);
var proc = spawn(argv[3], argv.slice(4), {
  stdio: 'inherit'
});

proc.once('exit', function(code) {
  status('Finished', argv.slice(2).join(' '), code, (Date.now() - start) / 1000);
  process.exit(code);
});
