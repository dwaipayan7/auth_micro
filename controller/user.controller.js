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
        select:{
          id: true,
          name: true,
          email: true,
        }
    
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


  static async getUsers(req, res) {
    try {

      const {userIds} = req.body;

      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(200).json({
        // message: "Users found",
        users: users,
      });
      
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
      
    }
  }
}

export default UserController;