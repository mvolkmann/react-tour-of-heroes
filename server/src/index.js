// @flow

import bodyParser from 'body-parser';
//import cors from 'cors';
import express from 'express';
import healthCheck from 'express-healthcheck';
import morgan from 'morgan';

import crudService from './crud-service';
//import {heroService} from './hero-service';

const app = express();

// This is only needed to serve static files.
//app.use('/', express.static('public'));

// Parse JSON request bodGies to JavaScript objects.
app.use(bodyParser.json());

// Parse text request bodies to JavaScript strings.
app.use(bodyParser.text());

/*
// Enable cross-origin resource sharing for localhost origins.
const corsOptions = {};
//  origin: ['http://localhost:3000', 'http://localhost:8084'],
//  credentials: true
//};
app.use(cors(corsOptions));
*/

//heroService(app);
crudService(app, 'hero');

// This causes logging of all HTTP requests to be written to stdout.
// The provided options are combined, common, dev, short, and tiny.
// For more details, browse https://github.com/expressjs/morgan.
//app.use(morgan('dev'));
app.use(morgan('common'));

// To get uptime of server, browse localhost:3000.
app.use(/^\/$/, healthCheck());

const HOST = '0.0.0.0';
const PORT = 3001; //process.argv.pop();
app.listen(PORT, HOST, () => console.info('listening on', PORT));
