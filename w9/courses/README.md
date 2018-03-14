### Express example

This example illustrates
  - creating RESTful routes using Express
  - Express middleware such as logging
  - Basic EJS use

It was enhanced to include
  - Mocha tests
  - ESLint
  - Babel
  - Travis continuous integration

It was further enhanced to use Mongoose and Mongodb. 

There are a few steps to getting Mongodb running and to set everything up.

## Setup

### Database

If you are using the CS teaching lab machines, then you can add the following to your PATH 
variable to use the installed MongoDB executables.

```
export PATH=/u/csc309h/winter/pub/bin:$PATH
```

If you are using your own machine, you will first need to install MongoDB Community edition.
Download information and instructions are [here](https://docs.mongodb.com/manual/install
ation/?jmp=footer).

Now you can create a directory to store your database in and start the database server proc
ess.

```
mkdir data
mongod --dbpath=$PWD/data
```

### Seeding the database

The next step is to populate the database with data.  We will [import the JSON file](https:
//www.zaiste.net/2012/08/importing_json_into_mongodb/) into the database.

```
mongoimport --db coursesdb --collection courses --type json --file courses.json --jsonArray
```

Note that we need to specify a database name "coursesdb" and a collection "courses". (Normally, the collection is the plural of the model name.)

### Running the server

Now you can run `npm install` to install the rest of the Node modules needed for this lab.

You can try running the server using `nodemon src/app`. We use nodemon so saving `.js` files will restart the server with your changes.  If you change a '.ejs' file, you will need to manually restart the server.

### Application

You will find a [tutorial on Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications) helpful to find information about the Mongoose operations.

### Reading the code

We have added a file called `course.js` in the `models` directory.  This file makes the connection to the running database, sets up the schema, and creates a `Course` model.

The `course-routes.js` file contains the functions that handle the incoming requests.  This file imports the model, so that we can use it to interact with the database.


#### Trace through adding a new course

The front end for this part of the application hasn't changed from our previous example code (except that we have changed the data structure labels). When the user "Submits" their entries, a POST message is sent to the server.  The route is the same as well, but the function that handles the request has changed.

The `addOne` function in `routes/course-routes.js` creates a new Course model object, fills it in with the data from the HTTP POST request, and calls `save` to save it to the database.



