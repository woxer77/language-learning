const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const { APP_PORT, CLIENT_URL } = require('./src/configs/config');
const db = require('./src/configs/db');

const authRoute = require('./src/routes/auth');
const userRoute = require('./src/routes/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: CLIENT_URL,
  preflightContinue: false
}));
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.listen(APP_PORT, () => {
  console.log("You're listening on port " + APP_PORT);
});

db.raw('SELECT 1')
  .then(() => {
    console.log('PostgreSQL is connected');
  })
  .catch((e) => {
    console.log('PostgreSQL is not connected');
    console.error(e);
  });
