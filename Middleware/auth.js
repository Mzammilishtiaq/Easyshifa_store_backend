import jwt from 'jsonwebtoken';

export const ClientAuthorizationUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided", success: false });
    }

    try {
        const token_decode = jwt.verify(token, 'mzammil');
        req.body.userId = token_decode.id;
        next(); // ✅ Call next() only once after successful verification
    } catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};
