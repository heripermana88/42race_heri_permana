require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes/api');
const home = require('./routes/home-page');
const cors = require('cors');
const app = express();
const { PORT, mongoUri } = require('./config');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use('/', home);
app.use('/api', api);

app.listen(PORT, () => console.log('Server Running'));