const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(" ")[1];
    if(!token) return res.status(401).json({messenge: ' No  token provided'});

    try {
        const payload = jwt.verify(token,"catFly100miles");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(500).json({messenge: error});
    }
    
};