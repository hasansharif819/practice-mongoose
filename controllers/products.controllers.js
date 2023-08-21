const express = require('express');
const { getDb } = require('../utils/dbConnect');
const Products = require('../models/Products');
const { getProductsServices, createProductsServices, updateProductsServicesById, bulkUpdateProductsServicesById, deletedProductByIdServices, bulkDeleteProductsServicesById, findoneProductByIdServices } = require('../services/products.services');

module.exports.getProducts = async (req, res, next) => {
    try {
        // const products = await getProductsServices();
        
        //sometimes we need to pass parameter then getProductsServices theke
        // limit ta k parameter hisebe niye nite hobe (limit)

        // const products = await getProductsServices(req.query.limit);

        
        //Query parameters for query by req.query
        let queryData = {...req.query};
        
        //Sort, page, limit, etc. egula k exclude kore nite hobe query Data theke.
        const excludesFields = ["page", "limit", "sort", "fields"];
        excludesFields.forEach(field => delete queryData[field]);

        // console.log("req.query, original query = ", req.query);
        // console.log("queryData, new query = ", queryData);

        const queries = {};

        //grater than, less than, grater than or equal, etc. eigular jonno 
        //client side theke req.query te request pathano hoy like
        //http://localhost:5000/api/v1/products?price[gt]=50
        //bracket er vitorer data gulo object hisebe provide kore sathe $(doller) sign
        //ta dey na... sei jonno amader k replace kore and regex use kore amdr
        //requirement fullfill korete hoy
        
        //gt || lt || gte || lte
        const queryDataString = JSON.stringify(queryData);
        const replacingQueryData = queryDataString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`); //regex
        queryData = JSON.parse(replacingQueryData);
        // console.log(parsedQueryData);

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fieldsBy = req.query.fields.split(',').join(' ');
            queries.fields = fieldsBy;
        }

        if (req.query.page) {
            // const pageBy = req.query.page.split(',').join(' ');
            // queries.page = pageBy;

            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        if (queryData) {
            const products = await getProductsServices(queryData, queries);
            
            res.status(200).json({
            status: 'success',
            message: "Query is successfull!!!",
            data: products
        })
            // res.send({ success: true, products });
        }
        else {
            const products = await getProductsServices(queries);
            
            res.status(200).json({
                status: 'success',
                message: "Data is successful!!!",
                data: products
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Data is not found",
            error: error.message
        })
    }
    next();
}

//get a single product
// module.exports.productsID = async(req, res, next) => {
//     try {
//         const {id} = req.params;
//         const filter = products.find(product => product.id === Number(id));
//         res.send(filter);
//     } catch (error) {
        
//     }
// }

module.exports.createProduct = async (req, res, next) => {
    try {
        //save / create new data
        // const product = new Products(req.body);
        const result = await createProductsServices(req.body);

        // result.logger();

        res.status(200).json({
            status: 'success',
            message: "Data is successfully inserted!!!",
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

//find one product by id
module.exports.findProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await findoneProductByIdServices(id);
        res.status(200).json({
            status: 'success',
            message: `Successfully found the product by id ${ id } !!!`,
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! product is not found... Please try again later",
            error: error.message
        })
    }
}

/** file upload */
exports.fileUpload = (req, res) => {
    try {
        // res.status(200).json(req.file)
        /**
         * for multiple file upload
         */
        res.status(200).json(req.files)
        
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! file not update... Please try again later",
            error: error.message
        })
        
    }
}
