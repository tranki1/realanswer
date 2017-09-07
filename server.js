const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const questions = require('./routes/api/questions');

const app = express();

//body pareser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

//passport middleware
app.use(passport.initialize());
//passport config
require('./config/passport')(passport);

// Use route
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/questions', questions);

//for heroku port and local port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
