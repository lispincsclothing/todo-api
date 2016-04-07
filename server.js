var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('ToDo App is launched! on Root');
});

app.get('/todos', function(request, response) {
  response.json(todos);
});

app.get('/todos/:id', function(request, response) {

  var input_id = parseInt(request.params.id,10);
  var result = _.findWhere(todos, {id: input_id});

  if (result) {
    response.json(result);
  } else {
    response.status(404).send();
  }
});

app.post('/todos', function (request, response) {
  var body = _.pick(request.body, 'completed', 'description');
  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length ===0) {
    return response.status(400).send();
  }
  body.description = body.description.trim();
  body.id = todoNextId++;
  todos.push(body);
  response.json(body);
});


app.delete('/todos/:id', function(request, response) {
  var input_id = parseInt(request.params.id,10);
  var result = _.findWhere(todos, {id: input_id});

  if (result) {
    todos = _.without(todos, result)
    response.json(result);
  } else {
    response.status(404).json({"error": "no todo found with that id"});
  }
});

app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT );
});
