import userModel from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

export const createUser = async (req, res, next) => {

  try {

    const { userName, email, password } = req.body;

    const checkExistingUser = await userModel.findOne({ email });

    if (!checkExistingUser) {
      if (!userName || !email || !password) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        userName,
        email,
        password: hashPassword
      });

      const saveUser = await newUser.save();
      return res.status(201).json({ user: saveUser, message: "User successfully added" });
    }

  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (!checkUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: checkUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ token, message: `Successfully login to system with email: ${email}` });

  } catch (err) {
    next(err);
  }
};