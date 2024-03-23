require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('Error: ', console.error.bind(console, 'Connection Error:'));
db.once('open', function () {
	console.log('Database connected successfully');
});
