const express = require('express');
const cors = require('cors');
const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const router = require('./router');
import { Request, Response } from 'express';

const corsConfig = {
  // REMOVE-START
  origin: 'http://localhost:3000',
  credentials: true,
  // REMOVE-END
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);
app.get('*', (request: Request, res:Response) => {
  res.status(404);
  res.send('Sorry, not found 😞');
});

const server = app.listen(SERVER_PORT, (err:Error) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`); // eslint-disable-line no-console
  } else {
    console.log(`🚀 Server (JWT) is listening on port ${SERVER_PORT}!`); // eslint-disable-line no-console
  }
});

// server needs to be exported for the tests to work
module.exports = server;
