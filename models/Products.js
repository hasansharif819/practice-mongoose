const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

//Schema ==> Model ==> Query

//Schema Design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the product name"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name should be at-least 3 characters."],
        maxLength: [50, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    
    //Product schema te price and quantuty hobe na
    //coz amader product ta different zone a
    //price and quantity vary korte pare
    // price: {
    //     type: Number,
    //     required: true,
    //     min: [0, "Price can't be negative."]
    // },
    
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bags"],
            message: "Unit value can't be {VALUE}, it must be kg / litre / pcs / bags"
        }
    },
    imageURLs: {
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide  a valid image urls"],
        // validate: {
        //     validator: (value) => {
        //         if (!Array.isArray(value)){
        //             return false;
        //         }
        //         isValid = true;
        //         value.forEach(url => {
        //             if (!validator.isURL(url)) {
        //                 isValid = false;
        //             }
        //         })
        //         return isValid;
        //     },
        //     message: "Please provide valid image urls"
        // }
    },

    //Product ta independent rakhte hobe.
    //Different zone a different price and quantity
    //thakte pare. Sei jonno product aa price and quantity rakha jabe na.
    // quantity: [{
    //     type: Number,
    //     required: true,
    //     min: [0, "Quantity can't be negative"],
    //     validate: {
    //         validator: (value) => {
    //             const isInteger = Number.isInteger(value);
    //             if (isInteger) {
    //                 return true;
    //             }
    //             else {
    //                 return false;
    //             }
    //         }
    //     },
    //     message: "Quantity must be an integer"
    // }],

    //Status ta oo zone to zone vary korbe 
    //Sei jonno status ta independent rakha jabe na
    // status: {
    //     type: String,
    //     required: true,
    //     enum: {
    //         values: ["in-stock", "out-of-stock", "discontinue"],
    //         message: "Status can't be {VALUE}, it must be like in-stock / out-of-stock / discontinue"
    //     }
    // },
    location: {
        type: String,
        required: [true, "Location can't be empty"]
    },
    category: {
        type: String,
        required: [true, "Category can't be empty"]
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    supplier: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Supplier",
            required: true
        }
    },
    //reference data
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    //embed data
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }],
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    
},
{
    timestamps: true
})


//Mongoose middleware pre and post method for data saving
//pre middleware

//Jehetu amader product model ta independent
//Product model a price or quantity thakteche na sehetu amder 
//eikhane pre middleware or post middleware dorkar neii

// productSchema.pre('save', function (next) {
    //this keyword refers the doc
    //this doc is coming from user by req.body
    //
    //instance creation ==> Do something ==> save();
//     if (this.quantity == 0) {
//         this.status = 'out-of-stock'
//     }
//     if (this.price <= 10) {
//         this.status = 'discontinue'
//     }
//     next();
// })

//mongoose post middleware
// productSchema.post('save', function (doc, next) {
//     console.log('This is post middleware');
//     next();
// })

//mongoose instant / inostant
// productSchema.methods.logger = function () {
//     console.log(`Data saved for the ${this.name}`)
// }

//Model
const Products = mongoose.model('Products', productSchema);

module.exports = Products;