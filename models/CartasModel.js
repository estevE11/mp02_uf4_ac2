const mongoose = require('mongoose');

module.exports = mongoose.model('cartas', mongoose.Schema({
    nino: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ninos',
        required: true
    },
    paje: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pajes',
        required: true
    },
    peticiones: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'juguetes',
        required: true
    },
    aceptada: {
        type: Boolean,
        required: true
    }
}));