'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

router.get('/', interceptors.requireAdmin, function(req, res, next) {
  models.State.paginate({
    page: req.query.page || 1,
    order: [['state', 'ASC']]
  }).then(function({docs, pages, total}) {
    res.json(docs.map(d => d.toJSON()));
  });
});

router.get('/:id', interceptors.requireAdmin, function(req, res, next) {
  models.State.findByPk(req.params.id).then(function(state) {
    if (state) {
      res.json(state.toJSON());
    } else {
      res.sendStatus(404);
    }
  }).catch(function(error) {
    res.sendStatus(500);
  });
});

router.patch('/:id', interceptors.requireAdmin, function(req, res, next) {
  models.State.findByPk(req.params.id).then(function(state) {
    return state.update({
      primary_date: req.body.primary_date,
      primary_type: req.body.primary_type,
      pledged_delegates: req.body.pledged_delegates,
      automatic_delegates: req.body.automatic_delegates
    });
  }).then(function(state){
    res.json(state.toJSON());
  }).catch(function(error) {
    console.log(error);
    if (error.name == 'SequelizeValidationError') {
      res.status(422).json({
        status: 422,
        messages: error.errors
      });
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = router;
