const mongoose = require('mongoose');

module.exports = mongoose.model('juguetes', mongoose.Schema({
    name: {
        type: String,
        validate: '/[A-Za-z0-9 -]{0,80}/',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
        max: 20
    },
    stock: {
        type: Number,
        required: false,
        min: 0,
        default: 0
    }
}));