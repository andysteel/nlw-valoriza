import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { compareSync } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {

  async execute({ email, password }: AuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if(!user) {
      throw new Error('Email/password incorrect.');
    }

    if(!compareSync(password, user.password)) {
      throw new Error('Email/password incorrect.');
    }

    const token = sign(
      {email: user.email},
      '2f4d365ed059244f7ef37d572b5e5fc8',
      {subject: user.id, expiresIn: '1h'});

    return token;
  }

}
