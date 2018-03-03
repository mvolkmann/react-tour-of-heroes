// @flow

import mySqlEasier from 'mysql-easier';

const config = require('../config.json');
mySqlEasier.configure(config.db);
