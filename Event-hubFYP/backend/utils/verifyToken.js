import jwt from 'jsonwebtoken';

// Middleware to verify the access token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorized" });
    }
    const accessToken = token.split(' ')[1];

    // Get JWT secret key from environment variable
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    // if token exists then verify the token 
    jwt.verify(accessToken, jwtSecretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }

        req.user = user;
        next(); 
    });
};

// Middleware to verify admin role
export const verifyAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        return res.status(401).json({ success: false, message: "You are not authorized to perform this action" });
    }

};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next()
        } else{
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
    });
};
