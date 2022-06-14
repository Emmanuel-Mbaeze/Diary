// stfCreate
const jwt = require ("jsonwebtoken")
const verification = (req,res,next)=>{
    try {
        const checkAuth =req.headers.authorization
        if (checkAuth) {
            const token = checkAuth.split(" ")[1]
            if (token) {
                jwt.verify(token,"stfCreates",(err,payload)=>{
                    if (err) {
                        res.status(500).json({
                            message:err.message
                        })
                    } else {
                        req.user = payload
                        next()
                    }
                })
            } else {
                res.status(500).json({
                    message:"Incorrect Token" 
                })
            }
        } else {
            res.status(500).json({
                message:"Access Denied"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = verification