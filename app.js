const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// connection db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/codeTest', {
  // useMongoClient: true
  useNewUrlParser: true,
  autoReconnect: true,
	reconnectTries: 60,
	reconnectInterval: 10000
});

const accounts = require('./routes/accounts');

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/accounts', accounts);

// Catch 404 Errors
  const err = new Error('not Found');
  app.use((req, res, next) => {
  err.status = 404;
  next(err);
});

// Error hanlder function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

// Start the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
