const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        return next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = validateSchema;