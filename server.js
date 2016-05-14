var myExpress = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = myExpress();
var PORT = process.env.PORT || 3000;
var todos =  [];
var todoNextId = 1;

app.use(bodyParser.json());// anytime json request comes in, express is gonna parse it and we are able to access it via req.body
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
    var matchedTodo = _.findWhere(todo, {id: todoId});
   
    if(matchedTodo) {
        res.json(matchedTodo);
    } else{
        res.status(404).send();
    }
});

// POST/todos
app.post('/todos', function (req, res) {//it alow us to set up API route that requires HTTP method 
   var body = req.body;                 
    
    // add id field 
    body.id = todoNextId;
    todoNextId++;
    // push the body into array
    todos.push(body);
    
    res.json(body);// it allow us to pass the body to the user.
});

app.listen(PORT, function() {
    console.log("Express listenig on port" + PORT + '!');
});