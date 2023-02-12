const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter price'],
        maxlength: [8, "Price can't be exceed 8 figures"]
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [       //One product may have many images
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],

    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stock"],
        maxlength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    }
});

module.exports = mongoose.model("Product", productSchema);