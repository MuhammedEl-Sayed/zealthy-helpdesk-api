export {};

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes/routes');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
