const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('../router/index'));

app.use('/uploads', express.static(path.resolve('uploads')));

var favicon = require('serve-favicon');
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var port = process.env.PORT || 3000 ;
app.listen(port);

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, 'templates/home.html'))
})