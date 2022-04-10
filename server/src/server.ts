// always load envs first
import 'dotenv/config';

// will inject async error handler
import 'express-async-errors';

// needed for class transformer class
import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

// middlewares
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// for rate limiting requests
import rateLimit from 'express-rate-limit';

// for history mode in vue.js
import history from 'connect-history-api-fallback';

import { initRedis } from './redis';
import { noteRouter } from './routers';

export const app = express();

// Fixing issues with rate limiting
// https://github.com/nfriedly/express-rate-limit#troubleshooting-proxy-issues
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true }));
app.use(helmet());
app.use(morgan('combined'));

// TODO: add logger

// add rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

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

// serve vue application
// https://github.com/bripkens/connect-history-api-fallback/tree/master/examples/static-files-and-index-rewrite
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(history());
app.use(express.static(path.join(__dirname, '..', 'public')));

// generic error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send();
});

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

// just start server if this is the main file
if (require.main === module) {
  start();
}
