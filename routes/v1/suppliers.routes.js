const express = require('express');
const router = express.Router();
const supplierController = require('../../controllers/suppliers.controllers');

router.route("/")
    .get(supplierController.getSuppliers)
    .post(supplierController.createSupplier)

router.route("/:id")
    .get(supplierController.getSupplierById)
    .patch(supplierController.updateSupplierById)

module.exports = router;