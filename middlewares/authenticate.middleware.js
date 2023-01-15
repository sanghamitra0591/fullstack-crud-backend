const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticate= (req, res, next)=>{
    const token= req.headers.authorization;
    if(token){
        const decoded= jwt.verify(token, process.env.key);
        if(decoded){
            const userId= decoded.userId;
            req.body.userId= userId;
            next();
        }else{
            res.send({"Error":"Please Login First"});
        }
    }else{
        res.send({"Error":"Please Login First"});
    }
}

module.exports= {
    authenticate
}