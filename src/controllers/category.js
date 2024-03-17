const { addCategoryService, getCategoriesService } = require("../services/category")

const addCategory = async (req, res) => {
    try {
        const result = await addCategoryService(req.body);

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    addCategory,
    getCategories
}