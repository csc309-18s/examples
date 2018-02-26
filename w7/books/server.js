// An example express server implementing a RESTful API

var express = require('express');

// The books module implements all the functionality for the app
var books = require('./routes/books');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static('assets'));
app.use(express.static(__dirname + '/'));


// The request body is received on GET or POST.
// body-parser is middleware that simplifies accessing the body data
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/books', books.findAll);
    
app.get('/books/:id', books.findById);

app.post('/addbook', books.addOne);

app.delete('/remove/:id', books.delById);


// start the server
app.listen(3000);
console.log('Listening on port 3000');

