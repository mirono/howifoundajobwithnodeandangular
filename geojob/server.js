var express = require('express');
var nano = require('nano')('http://localhost:5984');
var geojob = nano.use('geojob');
var app = express();
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
  res.sendfile('./geojob.html');
});
app.get('/jobs', function(req, res){
  geojob.view('jobs', 'jobs', function(err, body) {
    if (!err) {
      res.json(body);
    }
  });
});
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});