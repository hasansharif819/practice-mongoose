const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const supplierSchema = mongoose.Schema({
    
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a supplier name"],
        maxLength: 100,
        unique: true,
        lowercase: true,
        // uppercase: true
    },

    // description: String,
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        lowercase: true
    },

    brand: {
        name: {
            type: String,
            trim: true,
            required: true
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Brand"
        }
    },

    contact: {
        type: Number,
        required: [true, "Please enter a contact number"],
        unique: true
    },

    location: String,

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
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
},
    {
    timestamps: true
})

const Suppliers = mongoose.model("Supplier", supplierSchema)

module.exports = Suppliers;