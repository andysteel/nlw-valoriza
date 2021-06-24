import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import './database';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

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
