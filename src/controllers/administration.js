const knex = require("../../config/database");
const { createRestaurantService, findRestaurantByEmail, loginService } = require("../services/administration");

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
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createRestaurant,
    login
}

