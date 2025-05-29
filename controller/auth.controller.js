import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

class AuthController {
  static async register(req, res) {
    try {
      const payload = req.body;

      const salt = bcrypt.genSaltSync(10);

      payload.password = bcrypt.hashSync(payload.password, salt);

      const user = await prisma.user.create({
        data: payload,
      });

      return res
        .status(201)
        .json({ msg: "User registered successfully", user });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "User found",
        accessToken: token,

        user: user,
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }


  static async getUser(req, res) {
    try{

        const user = req.user;
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);

    }catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

}

export default AuthController;
