const jwt = require("jsonwebtoken");

const logged = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).json({ error: "Código inválido" });

        const [_, token] = authorization.split(" ");
        const user = jwt.verify(token, process.env.JWT_PRIVATE);
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = logged;