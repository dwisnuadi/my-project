import JWT from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).Json({massage : "token tidak ada"});
    const token = authHeader.split("")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
        if (err)
            return res.status(403).Json({massage : "token tidak valid"});
        req.user = decoded;
        next();
    });
};