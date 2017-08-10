const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const passport = require('passport');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

mongoose.connect('mongodb://localhost:27017/user-directory', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

app.use(express.static('public'));

//session
app.use(session({
  secret: 'ooooooweeeeeee',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passportconfig').configure(passport);

app.use(bodyParser.urlencoded({ extended: false }));

//Doug clued this in: http://www.douglashirsh.com/2017/07/26/node-express-mustache-template-caching/
const mustacheInstance = mustache();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/', userRoutes);
app.use('/', authRoutes);

app.listen(5687, function(){
  console.log('Here we go, port 5687!');
});
