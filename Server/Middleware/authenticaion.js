import jwt from "jsonwebtoken";

export const authenticate = async (req,res,next) =>{
    try{
        const authHeader = req.header("Authorization");
        const token = authHeader.split(" ")[1];
        if(!token){
          return  res.status(404).json({msg: "Token not provided"})
        }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verifyToken;
        next();
    }catch(error){
        res.status(403).json({msg: error.message});
    }
};



