'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();
const models = require('../models');


router.get('/', function(req, res, next) {
  const webpackStats = JSON.parse(fs.readFileSync('./client/webpack-stats.json'));
  res.set({'Cache-Control': 'public, max-age=3600'});
  res.render('index', {
    webpackStats: webpackStats
  });
});

router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

module.exports = router;
