// always load envs first
import 'dotenv/config';

// will inject async error handler
import 'express-async-errors';

// needed for class transformer class
import 'reflect-metadata';

import express from 'express';
import { initRedis } from './redis';
import { noteRouter } from './routers';
import cors from 'cors';

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true }));

// prefix all with api v1
const mainRouter = express.Router();

// routing
mainRouter.use('/note', noteRouter);

// adding router to app
app.use('/api/v1', mainRouter);

// easteregg
app.get('/pour/coffe', (req, res, next) => {
  res.status(419);
});

// TODO: generic error handler

// TODO: security header cors helmet etc.

// TODO: add logger

// TODO: gracefully shutdown, https://github.com/gajus/lightship#lightship-usage-examples-using-with-express-js

export async function start() {
  // connect to redis
  await initRedis();

  // TODO: typing process .env
  const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });

  return server;
}

// TODO: just start server if this is the main file
if (require.main === module) {
  start();
}
