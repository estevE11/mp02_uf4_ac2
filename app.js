const path = require('path');
const mongoose = require('mongoose');

const session = require('express-session');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const PajesModel = require('./models/PajesModel');

mongoose.connect('mongodb://localhost:27017/act2', { useNewUrlParser: true });

app.use(session({
    secret: 'Es un secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded());
//app.use(require('body-parser'));

app.engine('pug', require('pug').__express)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    req.custom = {};
    if (req.session.usuario) {
        req.custom.usuario = req.session.usuario;
    }
    next();
});

app.use('/juguetes', require('./routes/juguetes'));
app.use('/cartas', require('./routes/cartas'));

app.get('/', (req, res) => {
    res.render('index', { params: req.custom });
});

app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;

    PajesModel.findOne({ usuario: user }, (err, data) => {
        if (err || !data) {
            res.redirect('/');
            return;
        }
        console.log(pass, data.password);
        if (pass == data.password) {
            req.session.usuario = data._id;
            res.redirect('/juguetes');
            return;
        }
        res.redirect('/');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error al destruir las variables de sesión');
        }
        res.redirect('/');
    });
});

app.get('*', (req, res) => {
    res.send('404 page not found');
});

app.listen(PORT, () => {
    console.log(`Listening to localhost:${PORT}`);
});