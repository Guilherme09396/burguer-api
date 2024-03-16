const knex = require("../../config/database");
const { createRestaurantService, findRestaurantByEmail } = require("../services/administration");

const createRestaurant = async (req, res) => {
    try {
        const { email } = req.body;

        const existEmail = await findRestaurantByEmail(email);
        if (existEmail) {
            return res.status(500).json({ error: "E-mail já cadastrado." });
        }

        const createdRestaurant = await createRestaurantService(req.body);

        return res.status(201).json(createdRestaurant);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRestaurant
}

