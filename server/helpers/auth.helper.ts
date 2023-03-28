import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import database, { Data } from "../db/mockedDatabase";

dotenv.config();

export class AuthHelper {
  static async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password + process.env.PEPPER,
      Number(process.env.SALT_ROUNDS)
    );
    return hashedPassword;
  }

  static async verifyPassword(
    username: string,
    password: string
  ): Promise<Data | null> {

    const user = database.findUser(username);
    if (!user || !user.password) return null;

    const isSame = await bcrypt.compare(
      password + process.env.PEPPER,
      user.password
    );

    if (!isSame) return null;
    return user;
  }

  static generateToken(id: string): string {
    const token: string = jwt.sign({ id }, String(process.env.USER_SECRET));
    return token;
  }

  static verifyToken(token: string): boolean {
    const payload = jwt.verify(token, String(process.env.USER_SECRET));
    if (!payload) return false;
    return true;
  }
}