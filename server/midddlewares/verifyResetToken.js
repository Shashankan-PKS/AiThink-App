import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyResetToken = async (req, res, next) => {

    try {
        const token = req.cookies.resetToken;
        if (!token) return res.status(401).send({ msg: "Token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.resetEmail = decoded.email; // attach email to request object
        next();
    } catch (err) {
        return res.status(401).send({ msg: "Token invalid or expired" });
    }
};