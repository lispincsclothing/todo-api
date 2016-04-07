var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
  id:1,
  description: 'go do something',
  completed: false
},{
  id:2,
  description: 'go do something else',
  completed: false
},{
  id:3,
  description: 'go do something completely different',
  completed: true
}];

app.get('/', function(request, response) {
  response.send('ToDo App is launched! on Root');
});

app.get('/todos', function(request, response) {
  response.json(todos);
});


app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT );
});
