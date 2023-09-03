const express = require('express');
const { getDb } = require('../utils/dbConnect');
const Stocks = require('../models/Stock');

const {
    getStocksServices,
    createStocksServices,
    updateStocksServicesById,
    bulkUpdateStocksServicesById,
    deletedStockByIdServices,
    bulkDeleteStocksServicesById,
    findOneStockByIdServices } = require('../services/stock.services');

module.exports.getStocks = async (req, res, next) => {
    try {
        // const stocks = await getstocksServices();
        
        //sometimes we need to pass parameter then getstocksServices theke
        // limit ta k parameter hisebe niye nite hobe (limit)

        // const stocks = await getstocksServices(req.query.limit);

        
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
        //http://localhost:5000/api/v1/stocks?price[gt]=50
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
            const stocks = await getStocksServices(queryData, queries);
            
            res.status(200).json({
            status: 'success',
            message: "Query is successful!!!",
            data: stocks
        })
            // res.send({ success: true, stocks });
        }
        else {
            const stocks = await getStocksServices(queries);
            
            res.status(200).json({
                status: 'success',
                message: "Stock is successful!!!",
                data: stocks
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Stock is not found",
            error: error.message
        })
    }
    next();
}

//get a single stock
// module.exports.stocksID = async(req, res, next) => {
//     try {
//         const {id} = req.params;
//         const filter = stocks.find(stock => stock.id === Number(id));
//         res.send(filter);
//     } catch (error) {
        
//     }
// }

module.exports.createStock = async (req, res, next) => {
    try {
        //save / create new data
        // const stock = new stocks(req.body);
        const result = await createStocksServices(req.body);

        // result.logger();

        res.status(200).json({
            status: 'success',
            message: "Stock is successfully created!!!",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! stock is not inserted",
            error: error.message
        })
    }
    next();
}

module.exports.updateStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStocksServicesById(id, req.body);
        res.status(200).json({
            status: 'Success',
            message: `Updating successful with ${id}`
        })
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Updating the stock is not successful, Please try again later...",
            error: error.message
        })
    }
}

//Bulk update // update many stock at a time with their id
module.exports.bulkUpdateStocksById = async (req, res, next) => {
    try {
        const stocks = await bulkUpdateStocksServicesById(req.body);
        
        res.status(200).json({
            status: 'success',
            message: "Stock successfully updated!!!",
            data: stocks
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Updating the stock is failed, Please try again later...",
            error: error.message
        })
    }
}

//Bulk delete the stocks with delete many ById
module.exports.bulkDeleteStocksById = async (req, res, next) => {
    try {
        const stocks = await bulkDeleteStocksServicesById(req.body.ids);
        
        res.status(200).json({
            status: 'success',
            message: "Successfully deleted your stocks!!!",
            data: stocks
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Couldn't delete the stocks, Please try again later...",
            error: error.message
        })
    }
}

//Deleted single stock ById
module.exports.deletedStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        //Check before this id wala stock is exists or not
        const targetStock = await findOneStockByIdServices(id);
        if (!targetStock) {
            return res.status(400).json({
                status: "Failed",
                message: "Sorry the stock you want to delete that is not exist... Provide valid stock for deleted!!!",
            })
        }
        //Delete the stock
        const stocks = await deletedStockByIdServices(id);
        
        //Check the id wala stock is actually deleted or not. 
        //If upper condition is meet the requirements then this section is not require
        if (!stocks.deletedCount) {
            return res.status(400).json({
                status: "Failed",
                message: "Sorry couldn't delete the stock",
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Deleted successfully your stock!!!",
            data: stocks
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Stock is not deleted... Please try again later",
            error: error.message
        })
    }
}

//find one stock by id
module.exports.findStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const stock = await findOneStockByIdServices(id);
        res.status(200).json({
            status: 'success',
            message: `Successfully found the stock by id ${ id } !!!`,
            data: stock
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Sorry!!! Stock is not found... Please try again later",
            error: error.message
        })
    }
}
