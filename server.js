var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function(request, response) {
  response.send('ToDo App is launched! on Root');
});

app.listen(PORT, function() {
  console.log('Express listening on port ' + PORT );
});
