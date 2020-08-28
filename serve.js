// this is the server[服务端]

// 页面引用
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = require('express')();

// Page
var clientRouter = require('./routes/client');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', clientRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 服务引用
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  path: '/ownpath'
});

// 服务Server
io.on('connection', (socket) => {
  console.log('a user connected');

  // 聊天事件
  socket.on('chat msg', (msg) => {
    console.log('client send msg: ', msg)
    io.emit('chat msg', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// 服务地址
http.listen(process.env.port || 3000, () => {
  console.log(`listening on http://localhost:${process.env.port || 3000}`);
});