var myExpress = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = myExpress();
var PORT = process.env.PORT || 3000;
var todos =  [];
var todoNextId = 1;

app.use(bodyParser.json());
app.get('/', function(req, res) {
    res.send('Todo API Root');
});

// get todos,
app.get('/todos', function (req, res) {
    res.json(todos);
});

//Get/todos/:id
app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
   
    if(matchedTodo) {
        res.json(matchedTodo);
    } else{
        res.status(404).send();
    }
});

// POST/todos
app.post('/todos', function (req, res) {
    var body = _.pick(req.body,'description', 'completed'); 
   
    // validation for user's data.
   if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send("bad request was sent! Pleas check your input!");
    }
    
    body.description = body.description.trim();
   
    body.id = todoNextId;
    todoNextId++;
   
    todos.push(body);
    
    res.json(body);
});

// Delete/todos/:id
app.delete('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    if (!matchedTodo) {
        res.status(404).json({"error" : "no todo found with that id"});
    } else {
        //after delteing todo with matched Id ,update todos again.
        todos = _.without(todos, matchedTodo);
        // respond with deleted todo
        res.json(matchedTodo);
    }
});

app.listen(PORT, function() {
    console.log("Express listenig on port " + PORT + '!');
});