'use strict';
const config = require('../config');
const mongoose = require('mongoose');

const mongodb = config.mongooseUrl;
mongoose.connect(mongodb,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

let db = mongoose.connection;

db.on('error', (error) => {
  console.log('Error while connecting to mongodb database:', error);
});

db.once('open', () => {
  console.log('Successfully connected to mongodb database');
});

db.on('disconnected', () => {
  console.log('Disconnected to mongodb database');
  mongoose.connect(mongodb,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  db = mongoose.connection;
});
