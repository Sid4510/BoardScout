const dotenv = require('dotenv');
dotenv.config();

const authenticateUser = (req, res, next) => {
    try {
        const userId=req.body;
        console.log(req);
        if(userId)
            next();
        else{
            return res.status(401).json({ message: "Unauthorized", error: err.message });
        }
    } catch (err) {
        console.error("Token verification error:", err); 
        return res.status(401).json({ message: "Unauthorized", error: err.message });
    }
};

module.exports = authenticateUser;
