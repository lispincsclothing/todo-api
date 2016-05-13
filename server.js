var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var db = require('./db.js');
var bcrypt = require('bcrypt');

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
    var query = request.query;
    var where = {};

    if (query.hasOwnProperty('completed') && query.completed === 'true') {
        where.completed = true;
    } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
        where.completed = false;
    }

    if (query.hasOwnProperty('word') && query.word.length > 0) {
        where.description = {
            $like: '%' + query.word + '%'
        }
    }

    db.todo.findAll({
            where: where
        })
        .then(function(todos) {
            response.json(todos);
        }, function(e) {
            response.status(500).send();
        })
});

app.get('/todos/:id', function(request, response) {

    var input_id = parseInt(request.params.id, 10);

    db.todo.findById(input_id)
        .then(function(todo) {
            if (!!todo) { //converting to truth version (using !!) because todo will be null or object - looking for null
                response.json(todo.toJSON());
            } else {
                response.status(404).send();
            }
        }, function(e) {
            response.status(500).send(e);
        });
});

app.post('/todos', function(request, response) {
    var body = _.pick(request.body, 'completed', 'description');

    db.todo.create(body)
        .then(function(todo) {
            response.json(todo.toJSON());
        }, function(e) {
            response.status(400).json(e);
        });
});


app.delete('/todos/:id', function(request, response) {
    var input_id = parseInt(request.params.id, 10);

    db.todo.destroy({
            where: {
                id: input_id
            }
        })
        .then(function(rowsDeleted) {
            if (rowsDeleted === 0) {
                response.status(404).json({
                    error: 'No todo with id'
                });
            } else {
                response.status(204).send();
            }
        }, function(e) {
            response.status(500).send(e);
        });
});

app.put('/todos/:id', function(request, response) {
    var input_id = parseInt(request.params.id, 10);


    var body = _.pick(request.body, 'completed', 'description');
    var attributes = {};

    if (body.hasOwnProperty('completed')) {
        attributes.completed = body.completed;
    }

    if (body.hasOwnProperty('description')) {
        attributes.description = body.description;
    }

    db.todo.findById(input_id).then(function(todo) {
        if (todo) {
            todo.update(attributes).then(function(todo) {
              response.json(todo.toJSON());
            },
            function(e) {
              response.status(400).json(e);
            });
        } else {
            response.status(404).send();
        }
        },
      function() {
          response.status(500).send();
      });
  });

  app.post('/users', function(request, response) {
      var body = _.pick(request.body, 'email', 'password');

      db.user.create(body)
          .then(function(user) {
              response.json(user.toPublicJSON());
          }, function(e) {
              response.status(400).json(e);
          });
  });

  app.post('/users/login', function (request, response) {
    var body = _.pick(request.body, 'email', 'password');

    if ((typeof body.email !== 'string') || (typeof body.password !== 'string')) {
      return response.status(400).send();
    }

    db.user.findOne({
            where: {
              email: body.email
            }
        })
        .then(function(user) {
          if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
            return response.status(401).send();
          }
          response.json(user.toPublicJSON());
        }, function(e) {
            response.status(500).send();
        })
  });

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT);
    });
})
