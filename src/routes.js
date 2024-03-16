const express = require("express");
const app = express();
const router = express.Router();
const { createRestaurant, login, test } = require("./controllers/administration");
const logged = require("./middlewares/logged");

router.post('/create', createRestaurant);
router.post('/login', login);

//logged
router.use(logged);

module.exports = router;