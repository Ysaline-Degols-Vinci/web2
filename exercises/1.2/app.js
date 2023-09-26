var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const stats = {};

app.use((req, res, next) => {
  const currentOperation = `${req.method} ${req.path}`;
  const currentOperationCounter = stats[currentOperation];
  if (currentOperationCounter === undefined) stats[currentOperation] = 0;
  stats[currentOperation] += 1;
  const statsMessage = `Request counter : \n${Object.keys(stats)
    .map((operation) => `- ${operation} : ${stats[operation]}`)
    .join('\n')}
      `;
  console.log(statsMessage);
  next();
  });



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//1.2 application-level middleware


  /*
  version simplifiée parce qu'on est des boulets ici
  
  app.use(function(req, res, next) {
  let currentOperation = req.method + " " + req.path;
  if (stats[currentOperation] === undefined) {
    stats[currentOperation] = 0;
  }
  stats[currentOperation] += 1;

  let statsMessage = "Request counter : \n";
  for (let operation in stats) {
    statsMessage += "- " + operation + " : " + stats[operation] + "\n";
  }
  console.log(statsMessage);

  next();
});
  */ 
module.exports = app;
