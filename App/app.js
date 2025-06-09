const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const booksRoutes = require('./Routes/books');
const logger = require('./Main/middleware');

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(logger);

app.use('/books', booksRoutes);

app.get('/', (req, res) => {
    if (!req.cookies.authenticato) {
        res.cookie('Autenticato', { maxAge: 900000, httpOnly: true });
        console.log("Cookie autenticato impostato");
    }
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server in ascolto su http://localhost:3000');
});