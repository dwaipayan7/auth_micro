import prisma from "../config/db.js";
import { config } from "dotenv";
config();

class UserController {
  static async getUser(req, res) {
    try {
      const  id  = req.params.id;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        // select: {
        //   id: true,
        //   name: true,
        //   email: true,
        //   createdAt: true,
        //   updatedAt: true,
        // },
      });

      return res.status(200).json({
        // message: "User found",
        user: user,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;