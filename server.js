var myExpress = require('express');
var app = myExpress();
var PORT = process.env.PORT || 3000;
app.get('/', function(req, res) {
    res.send('Todo API Root');
});
app.listen(PORT, function() {
    console.log("Express listenig on port" + PORT + '!');
});