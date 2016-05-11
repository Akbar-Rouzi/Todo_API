var myExpress = require('express');
var bodyParser = require('body-parser');

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
    var todoId = parseInt(req.params.id, 10);//get the id(it might be number or string) that user passed in the URL and convert it to number 
    var matchedTodo;
    
    //To find match, iterate of todos array, and check if the Id in the URL is equla to the Id in todos array.
    todos.forEach(function (todo) {// here todo is any item or any object in todos array
       if (todoId === todo.id) {// as long as the Id in URL is matched to any id in array
           matchedTodo = todo;// then set that item with matched Id in the todos is equal to      matched to do.
       } 
    });
    if(matchedTodo) {
        res.json(matchedTodo);
    } else{
        res.status(404).send();
    }
});

// POST/todos
app.post('/todos', function (req, res) {// it alow us to set up API route that requires that HTTP 
   var body = req.body;                 //method
    //console.log('description:' + body.description);
    
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