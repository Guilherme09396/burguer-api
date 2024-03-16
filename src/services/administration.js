const knex = require("../../config/database");

const createRestaurantService = async ({ name, cnpj, email }) => {
    const [created] = await knex('restaurant').insert({
        name,
        cnpj,
        email
    }, '*');

    const [userAdmin] = await knex('users_restaurant').insert({
        id_restaurant: created.id,
        name: 'admin',
        password: 'admin'
    }, 'password');

    return { ...created, name_user: 'admin', ...userAdmin };
}

const findRestaurantByEmail = async (email) => {
    const restaurant = await knex('restaurant').where({ email });
    return restaurant[0];
}

module.exports = {
    createRestaurantService,
    findRestaurantByEmail
}
