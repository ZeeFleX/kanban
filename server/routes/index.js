var express = require('express');
var router = express.Router();
var db = require('../../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.User.findById(1, {
    include: [{
      model: db.Task, as: 'assignee', include: [{
        model: db.Project,
        include: [{
          model: db.User,
          include: db.Profile
        }]
      }]
    }, {
      model: db.Task, as: 'reporter'
    }]
  })
  .then(function(user) {
    console.log(user.assignee[0].Project.Users[0].Profile.firstname);
    res.render('index', {
      title: 'Express'
    });
  });

});

module.exports = router;
