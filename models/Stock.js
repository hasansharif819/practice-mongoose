const mongoose = require('mongoose');
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

//Schema ==> Model ==> Query

//Schema Design
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "Please provide the product name"],
        trim: true,
        // unique: [true, "Name must be unique"],
        minLength: [3, "Name should be at-least 3 characters."],
        maxLength: [50, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."]
    },
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
    quantity: [{
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    }],
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinue"],
            message: "Status can't be {VALUE}, it must be like in-stock / out-of-stock / discontinue"
        }
    },

    category: {
        type: String,
        required: [true, "Category can't be empty"]
    },

    brand: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a brand name"],
            lowercase: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },
    // store: {
    //     name: {
    //         type: String,
    //         trim: true,
    //         required: [true, "Please provide a store name"],
    //         lowercase: true,
    //         enum: {
    //             values: ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensing"],
    //             message: "{VALUE} is not a valid name"
    //         }
    //     },
    //     id: {
    //         type: ObjectId,
    //         required: true,
    //         ref: "Store"
    //     }
    // },

    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"]
        },
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }
},
{
    timestamps: true
})


//Mongoose middleware pre and post method for data saving
//pre middleware
stockSchema.pre('save', function (next) {
    //this keyword refers the doc
    //this doc is coming from user by req.body
    //
    //instance creation ==> Do something ==> save();
    if (this.quantity == 0) {
        this.status = 'out-of-stock'
    }
    if (this.price <= 10) {
        this.status = 'discontinue'
    }
    next();
})

//Model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;