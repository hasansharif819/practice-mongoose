const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products.controllers');
const uploader = require("../../middleware/uploader");

// router.post("/file-upload", uploader.single("image"), productsController.fileUpload);
//for multiple file uploader
router.post("/file-upload", uploader.array("image"), productsController.fileUpload);

/** {for front-end}
 * input type= "file", name="image" 
 * const formData = new FormData();
 * formData.append("image", formData)
*/

router
    .route('/')

/**
 * @api {get}   /products   all products
 * @apiDescription          Get all the products
 * @apiPermission           Admin
 * 
 * @apiHeader   string} Authorization    user's access token
 * 
 * @apiParams   {Number{1-}}    [page=1]    List page
 * @apiParams   {Number{1-100}} [limit=10]   Products per page
 * 
 * @apiSuccess  {object[]}  all the products
 * 
 * @apiError    {unauthorized 401}  Unauthorized    Only authenticated user can access the data
 * @apiError    {Forbidden 403}     Forbidden       Only admins can access the data
 */

    .get(productsController.getProducts)

/**
 * @api {post}   /user   added new product
 * @apiDescription          Add new user
 * @apiPermission           Admin
 * 
 * @apiHeader   string} Authorization    user's access token
 * 
 * @apiParams   {Number{1-}}    [page=1]    List page
 * @apiParams   {Number{1-100}} [limit=10]   Products per page
 * 
 * @apiSuccess  {object[]}  all the products
 * 
 * @apiError    {unauthorized 401}  Unauthorized    Only authenticated user can access the data
 * @apiError    {Forbidden 403}     Forbidden       Only admins can access the data
 */

    .post(productsController.createProduct)

/**
 * @api {patch / update}    updated more than one product ById //jotto gula update kora dorkar sobgular id lagbe
 * @apiDescription          Updated the existing product ById / Its many product updated at a time. Not a single product.
 * @apiPermission           Admin
 * 
 * @apiHeader   string} Authorization    user's access token
 * 
 * @apiParams               List page
 * @apiParams               Products per page
 * 
 * @apiSuccess  {object[]}  update the many products
 * 
 * @apiError    {unauthorized 401}  Unauthorized    Only authenticated user can access the data
 * @apiError    {Forbidden 403}     Forbidden       Only admins can access the data
 */
    
    router.route('/bulk-update')
        .patch(productsController.bulkUpdateProductsById)
    
    //Bulk delete // Delete many products ById at a time
    router.route('/bulk-delete')
        .delete(productsController.bulkDeleteProductsById)
    
        //dynmic id same route a sobar niche dite hobe 
        //coz dynamic route upore chole asle tokhn amader 
        //bulk - route ta dynamic id hisebe treate kore
router.route('/:id')
        .get(productsController.findProductById)
        .patch(productsController.updateProductById)
        .delete(productsController.deletedProductById)

module.exports = router;