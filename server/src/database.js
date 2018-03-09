// @flow

import mySqlEasier from 'mysql-easier';

// Configure database access.
const config = require('../config.json');
mySqlEasier.configure(config.db);
