const jtw = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader)
        return res.sendStatus(401);
    const token=authHeader.split(" ")[1];
    jtw.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403);
            req.user=decoded.UserInfo.username;
            req.roles=decoded.UserInfo.roles;
        next();
        }
    )
}
module.exports=verifyJWT