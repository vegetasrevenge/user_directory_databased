const router = require('express').Router();
const User = require('../models/user');


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
      if (err || user === false) {
        res.redirect('/login');
      }
      else {
        res.redirect('/');
      }
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const user = new User({username: req.body.username, password:
  req.body.password });
  user.save((err) => {
    if(err) {
      console.log('There was an error while saving the user.', err);
      done(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
