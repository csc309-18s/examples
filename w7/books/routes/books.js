let fs = require('fs');

// Putting the data in this file is a hack. Even when using
// a json file as data, we should really put the data management
// in a file separate from the routes file.

let bookObj;

function readJSON(filename, callback){
  	fs.readFile(filename, 'utf8', function (err, res){
    	if (err) return callback(err);
        callback(null, JSON.parse(res));
    });
}

// Read the book data from file and store it in the global object bookObj
readJSON('giller.json', function(err, b) {
	if(err)
		console.log("File read failed");
	else {
		bookObj = b;
		console.log("File read succeeded");
	}
});

/* The functions below handle the various http requests.
 * Note that they each take httpRequest and httpResponse objects as parameters
 */


exports.findAll = function(req, res) {
    res.send(JSON.stringify(bookObj));
};

// Remember that the id is part of the url (e.g. "/books/3") so it is found
// in the params field of the request object
exports.findById = function(req, res) {
    let id = req.params.id;
    res.send(JSON.stringify(bookObj.longlist[id]));
};

// The book object found in the request object is already in the proer
// format for our bookObj data structure, so we can just add it.
// Note that we aren't doing any checking for duplicates

exports.addOne = function(req, res) {
    console.log(req.body);
    bookObj.longlist.push(req.body);
    console.log("Success:");
    console.log(JSON.stringify(bookObj));
    res.send("Success");
};

exports.delById = function(req, res) {
    let id = parseInt(req.params.id);
    bookObj.longlist.splice(id-1,1);
    console.log("Success:");
    console.log(JSON.stringify(bookObj))
    res.send("Success");
};
