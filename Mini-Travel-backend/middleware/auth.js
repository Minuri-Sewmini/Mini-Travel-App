import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // Headers walin token eka gannawa
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Token eka verify karanawa
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Request ekata user ID eka add karanawa (Controller ekedi use karanna)
        req.userId = decoded.id;
        
        next(); // Eelaga function ekata yanna kiyanawa
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;