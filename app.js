var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const gameRouter = require("./routes/game")
const nftRouter = require("./routes/nft")

var app = express();
dotenv.config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const mongo_uri = 'mongodb+srv://ethonline:123ethonline@cluster0.suoughe.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use("/game",gameRouter)
app.use("/nft",nftRouter)

module.exports = app;
