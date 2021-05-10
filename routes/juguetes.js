const express = require('express');
const router = express.Router();

const JuguetesModel = require('./../models/JuguetesModel');
const { route } = require('./cartas');

router.get('/', (req, res) => {
    const filter = req.query.filter;
    let query = {};
    if (filter) query = { nombre: {$regex: `.*${filter}.*`}};

    JuguetesModel.find(query, (err, data) => {
        req.session.error = false;

        res.render('juguetes/index', { juguetes: data, params: req.custom});
    });
});

router.post('/', (req, res) => {
    const juguete = new JuguetesModel(req.body);
    juguete.save((err) => {
        console.log(err);
        if (err) {
            req.session.error = 'Hubo un error al crear el juguete';
            res.redirect('/juguetes/create');
            return;
        }
        req.session.error = false;
        res.redirect('/juguetes');
    });
});

router.get('/create', (req, res) => {
    req.session.error = false;
    res.render('juguetes/create', { params: req.custom });
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;

    JuguetesModel.findById(id, (err, data) => {
        req.session.error = false;
        res.render('juguetes/edit', { juguete: data, params: req.custom});
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    JuguetesModel.findByIdAndDelete(id, req.body, (err, data) => {
        if (err) {
            req.custom.error = 'Hubo un error al eliminar su carta';
            res.redirect('/juguetes');
            return;
        }
        req.session.error = false;
        res.redirect(`/juguetes`);
    });
});

router.post('/:id', (req, res) => {
    const id = req.params.id;

    JuguetesModel.findByIdAndUpdate(id, req.body, (err, data) => {
        if (err) {
            req.custom.error = 'Hubo un error al actualizar su juguete';
            res.redirect(`/juguetes/${id}/edit`);
            return;
        }
        req.session.error = false;

        res.redirect(`/juguetes/${id}/edit`);
    });
});


module.exports = router;