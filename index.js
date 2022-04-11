require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes/api');
const home = require('./routes/home-page');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());
app.get('/', home);
app.use('/api', api);

app.listen(port, () => console.log('Server Running'));