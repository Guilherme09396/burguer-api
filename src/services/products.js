const knex = require("../../config/database");
const productsDTO = require("../utils/dtos/productsByCategory");
const ProductsByCategory = require("../utils/dtos/productsByCategory");
const { findCategoryById } = require("./category");

const addProductsService = async ({ name, description, value_unit, category_id }) => {
    const existProduct = await findProductByName(name);
    if (existProduct) throw new Error('Produto já existente.');

    await findCategoryById(category_id);

    const [product] = await knex('products').insert({
        name,
        description,
        value_unit,
        category_id
    }, '*');

    return product;
}

const findProductByName = async (name) => {
    const [product] = await knex('products').whereILike('name', name);

    return product;
}

const getProductsByCategoryService = async (category_id) => {
    const products = await knex('products').where({ category_id });

    return products;
}

const getProductsService = async () => {
    const products = await knex('category')
        .select(knex.raw('category.id as category_id, category.name as category_name, products.*'))
        .from('products').rightJoin('category', 'products.category_id', 'category.id').orderBy('category.id', 'asc')

    const categories = addDtoCategory(products);

    products.forEach(value => {
        categories.forEach(cat => {
            if (value.category_id == cat.category_id) cat.products.push(productsDTO(value));
        })
    })

    return categories;
}

const addDtoCategory = (categories) => {
    const cats = [];
    categories.forEach(({ category_id, category_name }) => {
        if (cats.some(value => value.category_id == category_id)) return;
        cats.push({ category_id, category_name, products: [] })
    });
    return cats;
}


module.exports = {
    addProductsService,
    getProductsByCategoryService,
    getProductsService
}