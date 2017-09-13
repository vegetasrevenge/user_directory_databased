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
  req.body.password });
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

router.get('/edit', (req, res) => {
  res.render('edit');
});

router.post('/edit', (req, res) => {
  const user = User.findByIdAndUpdate(req.params.id, {$set: req.body})
  res.redirect('index');
});

module.exports = router;
