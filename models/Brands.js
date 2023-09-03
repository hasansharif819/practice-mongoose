const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({

    // products: [{
    //     type: ObjectId,
    //     ref: "Products"
    // }],
    
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a brand name"],
        maxLength: 100,
        unique: true,
        // lowercase: true
        uppercase: true
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid website"]
    },
    location: String,
    
    suppliers: [{
        name: String,
        contact: String,
        location: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    products: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Product"
        }
    },
},
    {
    timestamps: true
})

const Brands = mongoose.model("Brand", brandSchema)

module.exports = Brands;