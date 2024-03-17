const checkType = (req, res, next) => {
    if (req.user.type_user == 1) next();

    else return res.status(401).json({ error: "Acesso negado." });
}

module.exports = checkType;