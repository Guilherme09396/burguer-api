const express = require("express");
const router = express.Router();
const { createRestaurant, login, addUser } = require("./controllers/administration");
const logged = require("./middlewares/logged");
const checkType = require("./middlewares/checkTypeUser");
const { addCategory, getCategories } = require("./controllers/category");
const validateSchema = require("./middlewares/validateSchema");
const categorySchema = require("./utils/schemas/categoryJoi");
const restaurantSchema = require("./utils/schemas/restaurantJoi");
const productSchema = require("./utils/schemas/productsJoi");
const { addProducts, getProductsByCategory, getProducts } = require("./controllers/products.");

router.post('/create', validateSchema(restaurantSchema), createRestaurant);
router.post('/login', login);

//logged
router.use(logged);
router.get('/restaurant/:id_restaurant/categories', getCategories);
router.get('/restaurant/:id_restaurant/category/:id_category/products', getProductsByCategory);
router.get('/restaurant/:id_restaurant/menu', getProducts);

//logged admin
router.use(checkType);
router.post('/restaurant/:id_restaurant/user/add', addUser);
router.post('/restaurant/:id_restaurant/category/add', validateSchema(categorySchema), addCategory)
router.post('/restaurant/:id_restaurant/product/add', validateSchema(productSchema), addProducts);


module.exports = router;