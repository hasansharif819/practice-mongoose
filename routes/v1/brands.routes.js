const express = require('express');
const router = express.Router();
const brandController = require('../../controllers/brands.controllers');

router.route("/")
    .get(brandController.getBrands)
    .post(brandController.createBrand)

router.route("/:id")
    .get(brandController.getBrandById)
    .patch(brandController.updateBrandById)

module.exports = router;