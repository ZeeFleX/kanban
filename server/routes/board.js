'use strict'

var express = require('express');
var router = express.Router();
var db = require('../../models');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('board/index', {
    title: 'Express'
  });

});

router.get('/getBoard', function(req, res, next) {
  let projectId = 1;

  let projectPromise = db.Project.findById( projectId, {
    include: [{model: db.Swimlane, include: { model: db.Status, include: db.Task }}, db.User]
  }).then(function(project){
      res.send(project);
    });

});



module.exports = router;
