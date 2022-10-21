import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config();

const SECRET =process.env.SECRET;


const getUserId = (req,res,next) => {
        if(!req.header('Authorization'))
            return res.status(400).send({ message:"Ops you not authorized"})

        let token = req.header('Authorization').split(' ')[1]
        jwt.verify(token, SECRET, ((err, decoded) =>{
            if(decoded)
                req.query.id = decoded.id
        }) )

        next()
}

export {getUserId}