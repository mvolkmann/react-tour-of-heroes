// @flow

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import healthCheck from 'express-healthcheck';
import morgan from 'morgan';
import './database';

import getCrudRouter from './crud-router';
import heroRouter from './hero-router';

const app = express();

// This causes logging of all HTTP requests to be written to stdout.
// The provided options are combined, common, dev, short, and tiny.
// For more details, browse https://github.com/expressjs/morgan.
//app.use(morgan('common'));
app.use(morgan('dev'));

// Enable cross-origin resource sharing
// so the web server on port 3000 can send
// requests to the REST server on port 3001.
app.use(cors());

// This is only needed to serve static files.
//app.use('/', express.static('public'));

// Parse JSON request bodGies to JavaScript objects.
app.use(bodyParser.json());

// Parse text request bodies to JavaScript strings.
app.use(bodyParser.text());

//crudService(app, 'hero');
app.use('/hero', heroRouter);
app.use('/crud', getCrudRouter('hero'));

// To get uptime of server, browse localhost:3001.
app.use(/^\//, healthCheck());

/*
// Error-handling middleware functions must be
// registered after all other middleware and
// must take four parameters rather than three
// where the first is the error.
function errorHandler(err, req, res, next) {
  if (err) {
    console.log('index.js errorHandler: err =', err);
    res.status(500).send(err);
  } else {
    next();
  }
}
// $FlowFixMe
app.use(errorHandler);
*/

const PORT = 3001; //process.argv.pop();
app.listen(PORT, () => console.info('listening on', PORT));
