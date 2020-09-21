//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
var path = require('path');
const ejs = require('ejs');
const home = require("./app/controllers/index.controller.js")
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 


app.get("/", home.findAll);


require("./app/routes/student.routes.js")(app);
require("./app/routes/lesson.routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});