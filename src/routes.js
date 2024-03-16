const express = require("express");
const router = express.Router();
const { createRestaurant } = require("./controllers/administration");

router.post('/create', createRestaurant);
router.post('/login');

//logged


module.exports = router;