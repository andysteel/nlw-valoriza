import { NextFunction, Request, Response } from "express";

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {

  const admin = true;

  if(admin) {
    return next();
  }

  return res.status(401).json({
    error: 'User Unauthorized'
  })
}
