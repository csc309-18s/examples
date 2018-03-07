// fyi You'll have to start by installing several modules,
// including express, express-validator, ejs, and body-parser.
// npm install express express-validator ejs body-parser
var express = require('express')
var app = express()
var expressValidator = require('express-validator')
var bodyParser = require('body-parser')


// Set views path, template engine and default layout
app.use(express.static(__dirname + '/assets'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');


// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// Get the index page:
app.get('/', function(req, res){
   res.render('forms_ex', {  // Note that .html is assumed.
        errors: ''
    });
});

// Get the index page:
app.get('/forms_ex', function(req, res){
   res.render('forms_ex', {  // Note that .html is assumed.
        errors: ''
    });
});

// Get the index page:
app.get('/forms_client', function(req, res){
   res.render('forms_client', {  // Note that .html is assumed.
        errors: ''
    });
});

// Getting the value from a form input:
app.post('/give_info', function(req, res)
{
    console.log("username: " + req.body.username);
    console.log("email: " + req.body.email);
    console.log("birthday: " + req.body.birthday);
    console.log("language: " + req.body.language);
    console.log("comments: " + req.body.comments);
    

    //res.send("Submitted");

});

var server = app.listen(3000, function()
{
  var port = server.address().port;
  console.log('Running on 127.0.0.1:%s', port);
});