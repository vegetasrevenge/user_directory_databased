const robots = require('./data');

robots.users.forEach(function(robot){
  console.log(JSON.stringify(robot));
});
