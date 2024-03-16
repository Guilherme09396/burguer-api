const { createRestaurantService, loginService, addUserService } = require("../services/administration");

const createRestaurant = async (req, res) => {
    try {
        const createdRestaurant = await createRestaurantService(req.body);

        return res.status(201).json(createdRestaurant);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const user = await loginService(req.body);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addUser = async (req, res) => {
    try {
        const { id_restaurant } = req.params;
        if (req.user.type_user == 0) throw new Error("Acesso negado.");

        await addUserService({ id_restaurant, ...req.body });
        return res.status(201).json({ message: "Usuário criado com sucesso!" })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRestaurant,
    login,
    addUser
}

