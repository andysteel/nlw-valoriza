import { NextFunction, Request, Response } from "express";
import { hashSync } from 'bcryptjs';

export const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
  let { password } = req.body;

  if(password) {
    const hashPassword = hashSync(password, 8);
    password = hashPassword;
    req.body = {...req.body, password}
    return next();
  }

  return res.status(400).json({
    error: 'Password not provided.'
  })
}
