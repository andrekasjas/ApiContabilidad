const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('../router/index'));

app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(3000);
console.log('serve on port 3000');