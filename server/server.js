//imports should be declared at the top of the file
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const mongoose = require('mongoose'); //require mongoose and connect to database
const dotenv = require('dotenv');
const routes = require('./routes/routes'); //routes imported
app.use(express.json());
dotenv.config();

app.use('/api', routes);//created an end point from front end to back end

//connecting to mongodb_ATLAS
mongoose.connect('mongodb+srv://soloproject:movies123@cluster0.xf2wk.mongodb.net/Movies?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err)); //run error if an error occurs
db.once('open', () => console.log('Connected to db')); //the database will listen run once!

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
	return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
	console.log(`server is listening on PORT ${PORT}`);
});

module.exports = app;
