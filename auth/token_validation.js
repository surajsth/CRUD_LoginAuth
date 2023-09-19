const jwt = require('jsonwebtoken')
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization")
        if (token) {
            token = token.slice(7);
            jwt.verify(token, "qwe123", (err, decoded) => {
                if (err) {
                    return res.json({
                        success: 0,
                        message: "invalid token"
                    })
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.json({
                success: 0,
                message: "Access denied to unauthorized user"
            })
        }
    }
}