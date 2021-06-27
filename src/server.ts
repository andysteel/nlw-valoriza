import express, { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import 'express-async-errors';
import './database';
import { router } from './routes';
import cors from 'cors';

const app = express();

Sentry.init({
  dsn: process.env.NLWVALORIZA_SENTRY,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

app.use(express.json());

app.use(router);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof Error) {
    return res.status(400).json({
      error: error.message
    })
  }

  return res.status(500).json({
    error: 'Internal Server Error'
  })
})

const port = 3000;

app.listen(port, () => { console.log(`Server is running on port ${port}`); });
