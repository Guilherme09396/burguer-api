const express = require("express");
const router = express.Router();
const { createRestaurant, login, addUser } = require("./controllers/administration");
const logged = require("./middlewares/logged");

router.post('/create', createRestaurant);
router.post('/login', login);

//logged
router.use(logged);
router.post('/restaurant/:id_restaurant/add-user', addUser);


module.exports = router;