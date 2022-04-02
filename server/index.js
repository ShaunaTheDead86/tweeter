'use strict';

// Basic express setup:

const PORT = 8080;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = require('./lib/in-memory-db');
const DataHelpers = require('./lib/data-helpers.js')(db);

// Update the dates for the initial tweets (data-files/initial-tweets.json).
require('./lib/date-adjust')();

const tweetsRoutes = require('./routes/tweets')(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use('/tweets', tweetsRoutes);

app.listen(process.env.PORT || 8080, () => {
	console.log('Example app listening on port ' + PORT);
});
