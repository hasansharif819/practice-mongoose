const Stocks = require('../models/Stock');
const Brand = require('../models/Brands');
const { default: mongoose } = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// exports.getstocksServices = async(limit) => {
    // const stocks = await stocks.find({}).limit(+limit); //all stocks
        // const stocks = await stocks.find({ status: { $ne: 'out-of-stock'} }); //not equal
        // const stocks = await stocks.find({ _id: '6429b5b7a297eaa7d388c7a7', name: 'Lehenga'}) //And condition
        // const stocks = await stocks.find({ $or: [{ _id: '6429b5b7a297eaa7d388c7a7', name: 'Lehenga'}]}) //or condition
        // const stocks = await stocks.find({quantity: {$gte: 100}}) //grater than or equal (gte) or grater than (gt)
        // const stocks = await stocks.find({price: {$gt: 3000}}) //grater than or equal (gte) or grater than (gt)
        // const stocks = await stocks.find({'name': { $in: ["Lehenga", "T-Shirt", "Shirt"]}}) //in operator that means only show that values or data which are in "Lehenga"
        // const stocks = await stocks.find({'location': { $in: ["Dhanmondi"]}}) //in operator that means only show that values or data which are in "uttara"
        
        //projection
        // const stocks = await stocks.find({}, 'name, price');
        // const stocks = await stocks.find({}, '-location -categories');
        // const stocks = await stocks.find({}).select({ name: 1 , _id: 0}); //only name


        //amra chaile limit sort sob gulai use korte pari uporer condition er pore
        // const stocks = await stocks.find({}, '-location -categories').limit(3);
        // const stocks = await stocks.find({}, '-location -categories').limit(5).sort({price: -1});
        
        //multiple condition
        // const stocks = await (await Stocks.where('location').equals('Uttara').where('price').gt('500'));
        // const stocks = await Stocks
        //     .where('location').equals(/\w/)
        //     .where('price').gt('500')
        //     .where('quantity').lt(100)
        //     .limit(2)
        //     .sort({price: -1});
        
        //find by id
        // const stock = await Stocks.findById('6429b5b7a297eaa7d388c7a7')
       
        //important notes --> please check find and findById with undefined value
        // const stock = await Stocks.findById(undefined)
    // return stocks;
// }

/**
 * Niche aggregation funtion kora hoyeche sob gulo stocks er jonno
 * sei jonno eta comment kore rakhlam
 */

// Get stocks by query from the req.query
exports.getStocksServices= async (queryData, queries) => {
    const { fields, sortBy} = queries;
    // if (queryData) {
        const stocks = await Stocks.find(queryData)
            .skip(queries.skip)
            .limit(queries.limit)
            .select(fields)
            .sort(sortBy);
        const total = await Stocks.countDocuments(queryData);
        const page = Math.ceil(total / queries.limit);
        return {total, page, stocks};
    // }
    // else {
    //     const stocks = await stocks.find({}).select(queries.fields).sort(queries.sortBy);
    //     return stocks;
    // }
}


//creating a new stock by post method
exports.createStocksServices = async (data) => {
    const stock = await Stocks.create(data);

    const { _id: stockId, brand } = stock;
    // console.log("brand_id: ", brand.id);
    // console.log("stock_id: ", stockId);

    const result = await Brand.updateOne(
        { _id: brand.id },
        {$push: {stocks: stockId}}
    )

    // console.log(result);
    return stock;
}

//update a existing stock by stockId
exports.updateStocksServicesById = async (stockId, data) => {
    // const stock = await stocks.updateOne({ _id: stockId }, {$set: data}, { runValidators: true });

    //here we can use all the condition && logic
    //price barbe joto tk kore barate chay ta present price er sathe addhobe
    
    // const stock = await stocks.updateOne({ _id: stockId }, {$inc: data}, { runValidators: true });
    // return stock;

    //another way to patch
    const stock = await Stocks.findById(stockId);
    const result = await stock.set(data).save();
    return result;
}

//update many 
exports.bulkUpdateStocksServicesById = async (data) => {
    // In this type of update many there is a problem that is this update all the data with a same value but real life scnerio that is not happened.
    
    // const result = await stocks.updateMany({ _id: data.ids }, data.data, { runValidators: true });

    //update the data into different ways as we can update the data as our requirements.

    const stocks = [];
    data.ids.forEach(stock => {
        stocks.push(stocks.updateOne({ _id: stock.id }, stock.data));
    });

    const result = Promise.all(stocks);
    return result;
}

//Bulk delete stocks ById with deletemany keyword
exports.bulkDeleteStocksServicesById = async (ids) => {
    const result = await Stocks.deleteMany({ _id: ids });

    //This command delete all the data at a time. So be carefull to use this.
    // const result = await stocks.deleteMany({});
    return result;
}

//delete a stock
exports.deletedStockByIdServices = async (id) => {
    const result = await Stocks.deleteOne({ _id: id });
    return result;
}

//find one
//it is commented because of aggregation for single stock

// exports.findOneStockByIdServices = async (stockId) => {
//     const stock = await Stocks.findById(stockId)
//         .populate("brand.id")
//         .populate("suppliedBy.id")
//         .populate("productId");
//     return stock;
// }

// using aggregation 

//Need more explore of aggregation
// exports.getStocksServices = async (queryData, queries) => {
//     const stock = await Stocks.aggregate([
//         // { $match: { 'store.name': 'dhaka' }},
//         { $match: {} },
//         {
//             $project: {
//                 store: 1,
//                 quantity: 1,
//                 price: { $convert: { input: '$price', to: 'int'}}
//             }
//         },
//         {
//             $group: {
//                 _id: '$store.name',
//                 totalProductsPrice: {
//                     $sum: {
//                         $multiply:
//                             ['$price', '$quantity']
//                     }
//                 }
//             }
//         }
//     ])
//     return stock;
// }


exports.findOneStockByIdServices = async (stockId) => {
    const stock = await Stocks.aggregate([

        //stage 1
        { $match: { _id: new ObjectId(stockId) } },
        //project kore amar jei jei field er value gulo dorkar oigula niye nilam.
        // 1 diye ney && 0 diye baad dey
        {
            $project: {
                category: 1,
                quantity: 1,
                price: 1,
                productId: 1,
                name: 1,
                "brand.name": {$toLower: '$brand.name'}
            }
        },

        //lookup kore brands collection theke brand er name diye oi brand k 
        //aggregate kora hocche rr details gulo brandDetails field aa rakha 
        //hocche
        {
            $lookup:{
                from: "brands",
                localField: "brand.name",
                foreignField: "name",
                as: "brandDetails"
            }
        },
    ])
    
    return stock;
}
