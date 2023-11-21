const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect To Database (NEW) But not working!!!!!!!!!! (because of secret in db.js!!!!!)
//const db = require('./config/database');
// Map global promise - get rid of warning
//mongoose.Promise = global.Promise;
// Connect to mongoose
//mongoose.connect(db.mongoURI, {
//useMongoClient: true
//})
//.then(() => console.log('MongoDB Connected...'))
//.catch(err => console.log(err));
// Connect to local test database (MY CODE  - Tested, seems to work!)
mongoose.connect(config.database);
// On Connection
mongoose.connection.on("connected", () => {
  console.log("Connected to Database " + config.database);
});
// On Error
mongoose.connection.on("error", (err) => {
  console.log("Database error " + err);
});

/* Connect To Database (OLD CODE)
mongoose.connect(config.database, { useMongoClient: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
}); */

const app = express();

// CORS Middleware
app.use(cors());

const users = require("./routes/users");

// Port Number
const port = 3000; //process.env.PORT || 8080;






// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize()); // ALDER NOTE: Commenting these
//app.use(passport.session());// lines out gets rid of the "no express-sessions" error:
//"Error: Login sessions require session support. Did you forget to use `express-session` middleware?"
// middleware issue that we had. I believe this had to be done to compensate for
// a passport UPDATE from 3.x to 4.x
require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", users);

// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {                                                                                                                          
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start Server
app.listen(port, () => {
  console.log("Server started on port " + port);
});
