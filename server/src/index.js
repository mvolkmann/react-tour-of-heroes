// @flow

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import healthCheck from 'express-healthcheck';
import morgan from 'morgan';
import './database';

//import crudService from './crud-service';
import heroService from './hero-service';

const app = express();

/*
// A custom middleware function
function authenticate(
  req: express$Request,
  res: express$Response,
  next: express$NextFunction
): void {
  const auth = req.get('Authorization');
  console.log('index.js authenticate: auth =', auth);
  if (auth !== 'magic token') {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
}
// Authenticate every path.
app.use('*', authenticate);
*/

/* TODO: Do you need this?
function noCache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}
app.use('*', noCache);
*/

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
app.use('/hero', heroService);

// To get uptime of server, browse localhost:3001.
app.use(/^\//, healthCheck());

const PORT = 3001; //process.argv.pop();
app.listen(PORT, () => console.info('listening on', PORT));
