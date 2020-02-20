'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

router.get('/', function(req, res, next) {
  models.State.findAll({
    order: [['primary_date', 'ASC'], ['state', 'ASC']]
  }).then(function(states) {
    res.set({'Cache-Control': 'public, max-age=3600'});
    res.json(states);
  });
});

router.get('/:id/candidates', interceptors.requireAdmin, function(req, res, next) {
  models.State.findByPk(req.params.id).then(function(state) {
    if (state) {
      models.RawResult.aggregate('answer', 'DISTINCT', {
        where: {
          state: state.state
        },
        order: [['answer', 'ASC']],
        plain: false
      }).then(function(answers) {
        res.json(answers.map(a => a.DISTINCT));
      }).catch(function(error) {
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(404);
    }
  }).catch(function(error) {
    res.sendStatus(500);
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
      automatic_delegates: req.body.automatic_delegates,
      delegates: req.body.delegates,
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
