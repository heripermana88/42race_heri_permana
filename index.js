import express from 'express';
import mongoose from 'mongoose';
import route from './routes/index.js';
import cors from 'cors';
const app = express();

mongoose.connect('mongodb://localhost:27017/strava_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
  res.send('hallo')
});
app.use('/account',route);

app.listen('3000', () => console.log('Server Running'));