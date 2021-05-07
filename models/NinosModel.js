const mongoose = require('mongoose');

module.exports = mongoose.model('ninos', mongoose.Schema({
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
    },
    nombreCompleto: {
        type: String,
        default: () => {
            return this.nombre + this.apellidos;
        }
    },
    edad: {
        type: Number,
        default: () => {
            const diff = Date.now() - this.fechaNacimiento.getTime();
            return Math.abs(new Date(diff).getUTCFullYear()-1970);
        }
    }
}));