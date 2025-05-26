import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({message: "Unauthorized"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).send({message: "Forbidden"});
        req.user = user;
        next();
    });

}

export default authMiddleware;