import bcrypt from 'bcrypt';
import prisma from '../config/db.js';

class AuthController{

    static async register (req, res) {

        const payload = req.body;

        const salt = bcrypt.genSaltSync(10);

        payload.password = bcrypt.hashSync(payload.password, salt);

        // const token = jwt.sign({email: payload.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        // payload.token = token;
        // payload.createdAt = new Date();

        const user = await prisma.user.create({
            data: payload
        })
        

        return res.json({"msg": "User registered successfully",user});

    }

}

export default AuthController;