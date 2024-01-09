const jwt =  require('jsonwebtoken');
const tokenBlacklist = new Set();

async function authenticateToken (req, res, next) {
    const authHeader =  req.headers['authorization'];
    const token =  authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    if (tokenBlacklist.has(token)) {
        return res.sendStatus(403); 
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user =  user;
        next();
    });
}

module.exports = {
    authenticateToken,
    tokenBlacklist
};