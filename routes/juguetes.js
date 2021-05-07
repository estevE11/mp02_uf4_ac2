const express = require('express');
const router = express.Router();

const JuguetesModel = require('./../models/JuguetesModel');
const { route } = require('./cartas');

router.get('/', (req, res) => {
    console.log(req.custom);
    JuguetesModel.find((err, data) => {
        res.render('juguetes/index', { juguetes: data, params: req.custom});
    });
});

router.post('/', (req, res) => {
    const juguete = new JuguetesModel(req.body);
    juguete.save();
    res.redirect('/juguetes');
});

router.get('/create', (req, res) => {
    res.render('juguetes/create', { params: req.custom });
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;

    JuguetesModel.findById(id, (err, data) => {
        res.render('juguetes/edit', { juguete: data, params: req.custom});
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    JuguetesModel.findByIdAndDelete(id, req.body, (err, data) => {
        if (!err) {
            res.redirect('/juguetes');
            return;
        }
        res.redirect(`/juguetes`);
    });
});

router.post('/:id', (req, res) => {
    const id = req.params.id;
    JuguetesModel.findByIdAndUpdate(id, req.body, (err, data) => {
        if (!err) {
            res.redirect('/juguetes');
            return;
        }
        res.redirect(`/juguetes/${id}/edit`);
    });
});


module.exports = router;