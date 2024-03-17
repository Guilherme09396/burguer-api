const knex = require("../../config/database");

const addCategoryService = async ({ name }) => {
    const existCategory = await findCategoryByName(name);
    if (existCategory) throw new Error('Categoria já existente.');

    const [category] = await knex('category').insert({
        name
    }, '*');

    return category;
}

const findCategoryByName = async (name) => {
    const [category] = await knex('category').whereILike('name', name);

    return category;
}

const findCategoryById = async (id) => {
    const [category] = await knex('category').where({ id });
    if (!category) throw new Error('Id da categoria inválido.');

    return category;
}

const getCategoriesService = async () => {
    const categories = await knex('category');

    return categories;
}

module.exports = {
    addCategoryService,
    getCategoriesService,
    findCategoryById
}