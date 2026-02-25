import { User } from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import type { Request, Response } from "../types/user.types.js";


export const register = async (req: Request, res: Response) => {

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    })

    const token = generateToken(user._id.toString())

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict"
    });

    return res.status(200).json({ message: "user created", user })

  } catch (error) {
    console.error("something wrong when creating", error)
  }
}

export const login = async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "user not found" })
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "user not found" })
    }

    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "wrong passward" })
    }

    const token = generateToken(user._id.toString())

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict"
    });


    return res.status(200).json({ message: "loging success", user })

  } catch (error) {
    console.error("login failed", error)
  }
}