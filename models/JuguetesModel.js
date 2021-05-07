const mongoose = require('mongoose');

module.exports = mongoose.model('juguetes', mongoose.Schema({
    nombre: {
        type: String,
        match: [/[A-Z0-9-]{1,80}/, 'asdf'],
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    peso: {
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