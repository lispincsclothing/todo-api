var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.send('ToDo App is launched! on Root');
});

// add query params - completed + keyword search:
app.get('/todos', function(request, response) {
    var queryParams = request.query;
    var filteredTodos = todos;

    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        filteredTodos = _.where(filteredTodos, {
            completed: true
        })
    } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        filteredTodos = _.where(filteredTodos, {
            completed: false
        })
    }

    if (queryParams.hasOwnProperty('word') && queryParams.word.length > 0) {
        filteredTodos = _.filter(filteredTodos, function(todo) {
            return todo.description.toLowerCase().indexOf(queryParams.word.toLowerCase()) > -1;
        });
    }

    response.json(filteredTodos);
});

app.get('/todos/:id', function(request, response) {

    var input_id = parseInt(request.params.id, 10);
    var result = _.findWhere(todos, {
        id: input_id
    });

    if (result) {
        response.json(result);
    } else {
        response.status(404).send();
    }
});

app.post('/todos', function(request, response) {
    var body = _.pick(request.body, 'completed', 'description');

    db.todo.create(body)
    .then(function(todo) {
        response.json(todo.toJSON());
    }, function(e) {
        response.status(400).json(e);
    });

    // if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length ===0) {
    //   return response.status(400).send();
    // }
    // body.description = body.description.trim();
    // body.id = todoNextId++;
    // todos.push(body);
    // response.json(body);
});


app.delete('/todos/:id', function(request, response) {
    var input_id = parseInt(request.params.id, 10);
    var result = _.findWhere(todos, {
        id: input_id
    });

    if (result) {
        todos = _.without(todos, result)
        response.json(result);
    } else {
        response.status(404).json({
            "error": "no todo found with that id"
        });
    }
});

app.put('/todos/:id', function(request, response) {
    var input_id = parseInt(request.params.id, 10);
    var result = _.findWhere(todos, {
        id: input_id
    });
    if (!result) {
        return response.status(404).send();
    }

    var body = _.pick(request.body, 'completed', 'description');
    var validAttributes = {};

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return response.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return response.status(400).send();
    }

    _.extend(result, validAttributes);
    response.json(result);
});

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT);
    });
})
