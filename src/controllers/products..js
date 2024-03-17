const { addProductsService, getProductsByCategoryService, getProductsService } = require("../services/products")

const addProducts = async (req, res) => {
    try {
        const product = await addProductsService(req.body);
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const products = await getProductsByCategoryService(req.params.id_category);
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    addProducts,
    getProductsByCategory,
    getProducts
}