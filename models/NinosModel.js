const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    comportamiento: {
        type: String,
        required: true
    },
    poblacion: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    }
});

schema.virtual('nombreCompleto').get(function() {
    return this.nombre + " " + this.apellidos;
});

schema.virtual('edad').get(function () {
    const diff = Date.now() - this.fechaNacimiento.getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
});

module.exports = mongoose.model('ninos', schema);