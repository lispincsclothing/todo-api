var express = require('express');
var bodyParser = require('body-parser');

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
  var result = null;
  todos.forEach(function(value, index) {
    // console.log(value.id +"  "+input_id);
    if (value.id === input_id){
       result = value;
    }
  });
  if (result) {
    response.json(result);
  } else {
    response.status(404).send();
  }
});

app.post('/todos', function (request, response) {
  var body = request.body;
  console.log('description' + body.description);
  body.id = todoNextId++;
  todos.push(body);
  response.json(body);
})


app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT );
});
