const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const mongoose = require('mongoose');


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res, next) => {
  const user = new User({username: req.body.username, password:
  req.body.password});
  user.save((err) => {
    if(err) {
      console.log('There was an error while saving the user.', err);
      done(err);
      res.redirect('/register');
  } else {
    next();
    res.redirect('/');
  }
  });
});



router.post('/edit/:id', (req, res) => {
  const user = User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("RESULT: " + result);
    res.redirect('/');
  })
});

module.exports = router;
