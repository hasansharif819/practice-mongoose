const Products = require('../models/Products');
const Brand = require('../models/Brands');

// exports.getProductsServices = async(limit) => {
    // const products = await Products.find({}).limit(+limit); //all products
        // const products = await Products.find({ status: { $ne: 'out-of-stock'} }); //not equal
        // const products = await Products.find({ _id: '6429b5b7a297eaa7d388c7a7', name: 'Lehenga'}) //And condition
        // const products = await Products.find({ $or: [{ _id: '6429b5b7a297eaa7d388c7a7', name: 'Lehenga'}]}) //or condition
        // const products = await Products.find({quantity: {$gte: 100}}) //grater than or equal (gte) or grater than (gt)
        // const products = await Products.find({price: {$gt: 3000}}) //grater than or equal (gte) or grater than (gt)
        // const products = await Products.find({'name': { $in: ["Lehenga", "T-Shirt", "Shirt"]}}) //in operator that means only show that values or data which are in "Lehenga"
        // const products = await Products.find({'location': { $in: ["Dhanmondi"]}}) //in operator that means only show that values or data which are in "uttara"
        
        //projection
        // const products = await Products.find({}, 'name, price');
        // const products = await Products.find({}, '-location -categories');
        // const products = await Products.find({}).select({ name: 1 , _id: 0}); //only name


        //amra chaile limit sort sob gulai use korte pari uporer condition er pore
        // const products = await Products.find({}, '-location -categories').limit(3);
        // const products = await Products.find({}, '-location -categories').limit(5).sort({price: -1});
        
        //multiple condition
        // const products = await (await Products.where('location').equals('Uttara').where('price').gt('500'));
        // const products = await Products
        //     .where('location').equals(/\w/)
        //     .where('price').gt('500')
        //     .where('quantity').lt(100)
        //     .limit(2)
        //     .sort({price: -1});
        
        //find by id
        // const product = await Products.findById('6429b5b7a297eaa7d388c7a7')
       
        //important notes --> please check find and findById with undefined value
        // const product = await Products.findById(undefined)
    // return products;
// }

//Get products by query from the req.query
exports.getProductsServices = async (queryData, queries) => {
    const { fields, sortBy} = queries;
    // if (queryData) {
        const products = await Products.find(queryData)
            .skip(queries.skip)
            .limit(queries.limit)
            .select(fields)
            .sort(sortBy);
        const total = await Products.countDocuments(queryData);
        const page = Math.ceil(total / queries.limit);
        return {total, page, products};
    // }
    // else {
    //     const products = await Products.find({}).select(queries.fields).sort(queries.sortBy);
    //     return products;
    // }
}
//creating a new product by post method
exports.createProductsServices = async (data) => {
    const product = await Products.create(data);

    const { _id: productId, brand } = product;
    console.log("brand_id: ", brand.id);
    console.log("product_id: ", productId);

    const result = await Brand.updateOne(
        { _id: brand.id },
        {$push: {products: productId}}
    )

    // console.log(result);
    return product;
}

//update a existing product by productId
exports.updateProductsServicesById = async (productId, data) => {
    // const product = await Products.updateOne({ _id: productId }, {$set: data}, { runValidators: true });

    //here we can use all the condition && logic
    //price barbe joto tk kore barate chay ta present price er sathe addhobe
    
    // const product = await Products.updateOne({ _id: productId }, {$inc: data}, { runValidators: true });
    // return product;

    //another way to patch
    const product = await Products.findById(productId);
    const result = await product.set(data).save();
    return result;
}

//update many 
exports.bulkUpdateProductsServicesById = async (data) => {
    // In this type of update many there is a problem that is this update all the data with a same value but real life scnerio that is not happened.
    
    // const result = await Products.updateMany({ _id: data.ids }, data.data, { runValidators: true });

    //update the data into different ways as we can update the data as our requirements.

    const products = [];
    data.ids.forEach(product => {
        products.push(Products.updateOne({ _id: product.id }, product.data));
    });

    const result = Promise.all(products);
    return result;
}

//Bulk delete products ById with deletemany keyword
exports.bulkDeleteProductsServicesById = async (ids) => {
    const result = await Products.deleteMany({ _id: ids });

    //This command delete all the data at a time. So be carefull to use this.
    // const result = await Products.deleteMany({});
    return result;
}

//delete a product
exports.deletedProductByIdServices = async (id) => {
    const result = await Products.deleteOne({ _id: id });
    return result;
}

//find one
exports.findoneProductByIdServices = async (productId) => {
    const product = await Products.findById(productId);
    return product;
}