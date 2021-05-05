const path = require('path');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());
//app.use(require('body-parser'));

app.engine('pug', require('pug').__express)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

//app.use('/juguetes', require('./routes/juguetes'));

app.get('/', (req, res) => {
    res.render('index');
});



app.listen(PORT, () => {
    console.log(`Listening to localhost:${PORT}`);
});