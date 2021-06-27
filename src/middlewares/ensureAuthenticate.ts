import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization;

  if(token) {

    try {
      const { sub } = verify(token.substr(7), '2f4d365ed059244f7ef37d572b5e5fc8');

      req.user_id = sub as string

      return next();
    } catch(error) {
      return res.status(401).json({
        error: 'User Unauthorized'
      })
    }

  }

  return res.status(401).json({
    error: 'User Unauthorized'
  })
}
