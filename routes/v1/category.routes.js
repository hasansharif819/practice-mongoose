const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category.controllers');

router.route("/")
    .get(categoryController.getCategory)
    .post(categoryController.createCategory)

router.route("/:id")
    .get(categoryController.getCategoryById)
    .patch(categoryController.updateCategoryById)

module.exports = router;