var myExpress = require('express');
var app = myExpress();
var PORT = process.env.PORT || 3000;

var todos =  [{
    id: 1,
    description: "Look for a girl to get married...",
    completed: false
}, { 
    id: 2,
    description: "Be a strong mam!",
    completed: false
}, {
    id: 3,
    description: "book a ticket for going home.",
    completed: true
}];

app.get('/', function(req, res) {
    res.send('Todo API Root');
});

// get todos,
app.get('/todos', function (req, res) {
    res.json(todos);
});

//Get/todos/:id
app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);//get the id(it might be number or string) that user passed in the URL and convert to number 
    var matchedTodo;
    
    //To find match, iterate of todos array, and check if the Id in the URL is equla to the Id in todos array.
    todos.forEach(function (todo) {// hre todo is any item or any object in todos array
       if (todoId === todo.id) {// as long as the Id in URL is matched to any id in array
           matchedTodo = todo;// then set that item with matched Id in the todos is equal to matched to do.
       } 
    });
    if(matchedTodo) {
        res.json(matchedTodo);
    } else{
        res.status(404).send();
    }
    
    
   //res.send('Asking for todo with id of ' + req.params.id);// req.params.id is used to fetch the excat value that user passed in URL
});
app.listen(PORT, function() {
    console.log("Express listenig on port" + PORT + '!');
});