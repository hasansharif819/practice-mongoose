const express = require('express');
const { getDb } = require('../utils/dbConnect');
const Products = require('../models/Products');
const { getProductsServices, createProductsServices, updateProductsServicesById, bulkUpdateProductsServicesById, deletedProductByIdServices, bulkDeleteProductsServicesById, findoneProductByIdServices } = require('../services/products.services');

module.exports.getProducts = async (req, res, next) => {
    try {
        // const products = await getProductsServices();
        
        //sometimes we need to pass parameter then getProductsServices theke
        // limit ta k parameter hisebe niye nite hobe (limit)

        const products = await getProductsServices(req.query.limit);

        res.status(200).json({
            status: 'success',
            message: "Data is successfull!!!",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Data is not found",
            error: error.message
        })
    }
    next();
}

module.exports.createProduct = async (req, res, next) => {
    try {
        //save / create new data
        // const product = new Products(req.body);
        const result = await createProductsServices(req.body);

        result.logger();

        res.status(200).json({
            status: 'success',
            message: "Data is successfull inserted!!!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Data is not inserted",
            error: error.message
        })
    }
    next();
}

module.exports.updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductsServicesById(id, req.body);
        res.status(200).json({
            status: 'Success',
            message: `Updating successful in ${id}`
        })
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Updating the product is not successful, Please try again later...",
            error: error.message
        })
    }
}

//Bulk update // update many product at a time with their id
module.exports.bulkUpdateProductsById = async (req, res, next) => {
    try {
        const products = await bulkUpdateProductsServicesById(req.body);
        
        res.status(200).json({
            status: 'success',
            message: "Data successfully updated!!!",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Updating the product is failed, Please try again later...",
            error: error.message
        })
    }
}

//Bulk delete the products with deletemany ById
module.exports.bulkDeleteProductsById = async (req, res, next) => {
    try {
        const products = await bulkDeleteProductsServicesById(req.body.ids);
        
        res.status(200).json({
            status: 'success',
            message: "Successfully deleted your products!!!",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Couldn't delete the product, Please try again later...",
            error: error.message
        })
    }
}

//Deleted single product ById
module.exports.deletedProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        //Check before this id wala product is exists or not
        const targetProduct = await findoneProductByIdServices(id);
        if (!targetProduct) {
            return res.status(400).json({
                status: "Failed",
                message: "Sorry the product you want to delete that is not exist... Provide valid product for deleted!!!",
            })
        }
        //Delete the product
        const products = await deletedProductByIdServices(id);
        
        //Check the id wala product is actually deleted or not. 
        //If upper condition is meet the requirements then this section is not require
        if (!products.deletedCount) {
            return res.status(400).json({
                status: "Failed",
                message: "Sorry couldn't delete the product",
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Deleted successfully!!!",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! product is not deleted... Please try again later",
            error: error.message
        })
    }
}