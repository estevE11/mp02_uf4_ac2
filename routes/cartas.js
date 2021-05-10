const express = require('express');
const router = express.Router();

const CartasModel = require('../models/CartasModel');
require('../models/NinosModel');
require('../models/JuguetesModel');

router.get('/', (req, res) => {
    CartasModel.find({ paje: { _id: req.session.usuario } }).populate('nino').populate('paje', '_id').exec((err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
        res.render('cartas/index', { cartas: data, params: req.custom});
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    CartasModel.findOne({ _id: id }).populate('nino').populate('paje').populate('peticiones').exec((err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('cartas/show', { carta: data, params: req.custom});
    });
});

router.post('/:id', (req, res) => {
    const id = req.params.id;
    CartasModel.findByIdAndUpdate(id, { aceptada: true }, (err, data) => {
        if (err) {
            req.custom.error = 'Hubo un error al aceptar la carta';
            res.redirect(`cartas/${id}`);
            return;
        }
        req.session.error = false;

        res.redirect('/cartas');
    });
});

module.exports = router;