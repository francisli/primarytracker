'use strict';

const express = require('express');
const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');
const helpers = require('../helpers');

router.get('/', function(req, res, next) {
  const page = req.query.page || 1;
  models.Poll.paginate({
    page: page,
    paginate: 5,
    order: [['end_date', 'DESC'], ['start_date', 'DESC'], ['poll_id', 'DESC'], ['question_id', 'DESC']],
    where: { state: req.query.state ? req.query.state : null, party: 'DEM', answers_length: { [models.Sequelize.Op.gt]: 2 } },
    include: [{model: models.Pollster, as: 'pollster', include: ['pollster_rating']}]
  }).then(function({docs, pages, total}) {
    helpers.setPaginationHeaders(req, res, page, pages, total);
    res.json(docs.map(d => d.toJSON()));
  });
});

module.exports = router;
