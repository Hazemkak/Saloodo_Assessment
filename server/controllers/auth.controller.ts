import { Request, Response } from "express";
import { AuthHelper } from "../helpers/auth.helper";
import usersDatabase from "../db/Users.db";

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await AuthHelper.verifyPassword(username, password);
    if (user == null)
      return res.status(401).json({ message: "wrong password or username" });
    const token = AuthHelper.generateToken(user.id);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json(`error while login ${error}`);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, type } = req.body;

    const hashedPassword = await AuthHelper.hash(password);

    const newUser = usersDatabase.addUser(username, hashedPassword, type);

    const token = AuthHelper.generateToken(newUser.id);
    res
      .status(200)
      .json({ message: `User is created successfully`, token, user: newUser });
  } catch (error) {
    res.status(500).json(`error while creating user ${error}`);
  }
};

export const authController = {
  login,
  register,
};
