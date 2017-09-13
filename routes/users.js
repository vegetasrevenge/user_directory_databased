const router = require('express').Router();
const Users = require('../models/user');

router.get('/', function(req, res){
  Users.find({}).then(function(results) {
    res.render('index', { users: results });
  })
});

router.get('/details/:id', function(req, res){
  let userId = req.params.id;
  Users.findById(userId).then(function(results){
    res.render('details', results );
  })
});

router.get('/edit/:id', (req, res) => {
  let userId = req.params.id;
  Users.findById(userId)
    .then((results => {
      res.render('edit', results);
    }))
});

router.get('/hire', function(req, res){
  Users.find({ job: null }).then(function(results) {
    res.render('hire', { users: results })
  })
});

router.get('/employed', function(req, res){
  Users.find({ job: {$type: 2} }).then(function(results) {
    res.render('employed', { users: results })
    // console.log(results);
  })
});

module.exports = router;
