import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {

  const { user_id } = req;

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(user_id);

  if(user && user.admin) {
    return next();
  }

  return res.status(401).json({
    error: 'User Unauthorized'
  })
}
