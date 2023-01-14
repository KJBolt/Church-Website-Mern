import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (authHeader){
            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.JWT, (err, user) => {
                if (err) {
                    return res.status(500).json("Invalid token")
                }

                req.user = user;
                next();
            })
        }
    } catch (error) {
        res.status(500).status(error.message);
    }

};