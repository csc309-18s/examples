// fyi You'll have to start by installing several modules,
// including express, express-validator, ejs, and body-parser .
// and client-sessions
//npm install express express-validator ejs body-parser cookie-parser

var express = require('express');
var app = express();
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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
app.use(expressValidator()); // This line must be immediately after express.bodyParser()!

app.use(cookieParser());



// Get the index page:
app.get('/', function(req, res){
    // an illustration of adding cookies with different flags
    res.cookie('cookiehttpOnly', 5, {maxAge: 100000, httpOnly: true});
    res.cookie('cookieOne', 31, {maxAge: 100000});
    res.cookie('securecookie', 51, {maxAge: 100000, secure: true});

    res.render('login', {  // Note that .html is assumed.
        errors: ''
    });
});


// Getting the value from a form input:
app.post('/signup', function(req, res)
{
    // Very simply checking if the fields (by name) aren't empty:
	req.assert('username', 'A username is required').notEmpty();
    req.assert('password', 'A password is required').notEmpty();
    
    var errors = req.validationErrors();
    var mappedErrors = req.validationErrors(true);
    
    // If there's no errors, they won't be mapped.
    if ( mappedErrors.username || mappedErrors.password ) {
        if ( mappedErrors.username ) { 
            var errorUsername = mappedErrors.username.msg;
        }

        if (mappedErrors.password) {
            var errorPassword = mappedErrors.password.msg;
        }        
        
        // Note how the placeholders in serverSideValidation.html use this json:
        res.render('login',
            { errors: { error_username: errorUsername, error_password: errorPassword } }
        );
    
    } else {
        // You would do your processing of the submitted data here.
        
        res.send("Submitted");
    }
});

var server = app.listen(3000, function()
{
  var port = server.address().port;
  console.log('Running on 127.0.0.1:%s', port);
});
