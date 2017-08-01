const express = require('express');
const mustache = require('mustache-express');
const app = express();
//changing the route of the data from the data.js file; now the data comes from our mongo database
// const data = require('./data');

const mongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));

//Doug clued this in: http://www.douglashirsh.com/2017/07/26/node-express-mustache-template-caching/
let mustacheInstance = mustache();
mustacheInstance.cache = null;
app.engine('mustache', mustacheInstance);

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

express.response.debugRender = function(template, data) {
  data.json = JSON.stringify(data, null, '/t');
  this.render(template, data);
};

//these are the app.get routes for using the data.js file
//now, we are routing from the mongo database to the pages on our Server

// app.use(express.static(path.join(__dirname, 'public')));
//instead, use -->
// app.get('/', function(req, res){
//   res.render('index', data);
// });
//
// app.get('/details/:id', function(req, res) {
//   let profile =
//     data.users.find(function(item){
//       return item.id == req.params.id;
//     });
//     res.render('details', profile);
//     console.log(profile);
// });

app.get('/', function(req, res){
  db.collection('data').find({}).toArray(function(err, results){
    res.render('index', {users: results});
  })
});



app.get('/details/:id', function(req, res){
  db
    .collection('data')
    //using the find function to search by ID NUMBER within the parameters of the database request
    .find({id: Number(req.params.id)})
    .toArray(function(err, results){
      //this is going to transform the results parameter into an array
      res.render('details', results[0]);
  })
});

app.get('/hire', function(req, res){
  db
    .collection('data')
    .find({job: null})
    .toArray(function(err, results){
      res.render('hire', {users: results})
      console.log(results);
    });
});

app.get('/employed', function(req, res){
  db
    .collection('data')
    //
    .find({ job : {$ne : null} })
    .toArray(function(err, results){
      res.render('employed', {users: results})
      console.log(results);
    });
});



// app.get('/details/:id', function(req, res){
//   db
//     .collection('robots')
//     .find({type: })
// })

let db;

mongoClient.connect('mongodb://localhost:27017/user-directory', function(err, database){
  if(err){
    console.log(console.err())
  }else {
    db = database;
    app.listen(5687, function(){
      console.log('Here we go, port 5687!');

    });
  }
})
