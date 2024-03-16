const knex = require("../../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const findRestaurantByEmail = async (email, bool) => {
    const [restaurant] = await knex('restaurant').where({ email });
    if (bool) {
        if (restaurant) throw new Error("E-mail já cadastrado.")
    } else if (!restaurant) {
        throw new Error("E-mail não cadastrado.")
    }

    return restaurant;
}

const findRestaurantById = async (id) => {
    const [result] = await knex(restaurant).where({ id });
    if (!result) throw new Error("Id do restaurante está inválido.");

    return result;
}

const createRestaurantService = async ({ name, cnpj, email }) => {
    await findRestaurantByEmail(email, true);

    const hash = await bcrypt.hash('admin', 10);
    const [created] = await knex('restaurant').insert({
        name,
        cnpj,
        email
    }, '*');

    const [userAdmin] = await knex('users_restaurant').insert({
        id_restaurant: created.id,
        name: 'admin',
        password: hash
    }, 'password');

    return { ...created, name_user: 'admin', ...userAdmin };
}

const loginService = async ({ email, name, password: pass }) => {
    const { id } = await findRestaurantByEmail(email);
    const users = await knex('users_restaurant').where({
        id_restaurant: id
    });

    const userData = users.find(user => user.name == name);
    if (!userData) throw new Error("Usuário ou senha inválido.");
    if (!await bcrypt.compare(pass, userData.password)) throw new Error("Usuário ou senha inválido.")

    const jwt_ = jwt.sign(userData, process.env.JWT_PRIVATE, { expiresIn: '2h' });
    const { password, ...user } = userData;
    return { ...user, jwt_ };
}

const addUserService = async ({ id_restaurant, name, password, type_user = 0 }) => {
    const users = await knex('users_restaurant').where({
        id_restaurant
    });

    const existUser = users.find(user => user.name == name);
    if (existUser) throw new Error("Nome de usuário já existente.");

    const hash = await bcrypt.hash(password, 10);

    await knex("users_restaurant").insert({
        id_restaurant,
        name,
        password: hash,
        type_user
    })
}

module.exports = {
    createRestaurantService,
    findRestaurantByEmail,
    loginService,
    addUserService
}
