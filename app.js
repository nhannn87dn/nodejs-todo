const express = require("express");
const app = express();
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize');
const tasks = require("./routes/tasks.route");
const users = require("./routes/users.route");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// set secure HTTP headers 
app.use(helmet());
// sanitize request data
app.use(xss());
app.use(mongoSanitize());
// enable CORS - cross origin resoucre sharing
app.use(cors());
app.options("*",cors());


app.get('', async(req, res) => {
  res.send('API Todo List');
});

app.use('/api',users);
app.use('/api/tasks',tasks);

module.exports  = app;