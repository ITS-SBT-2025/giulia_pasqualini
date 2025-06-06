console.log('Hello, World!');

// const http = require('http');
// http.createServer(function(req, res) {
//     res.writeHead(200,
//         {'Content-Type': 'text/plain'});
//     res.write('Hello, World!!!\n');
//     res.end();
// }).listen(8000);

// const http = require('http');
// http.createServer(function(req, res) {
//     if (req.url === '/books') {
//     res.writeHead(404,
//         {'Content-Type': 'text/plain'});
//     res.write('Non ci sono libri qui!\n');
//     res.end();
//     } else {
//     res.writeHead(200,
//         {'Content-Type': 'text/plain'});
//     res.write('Hello, World!!!\n');
//     res.end();
//     }
// }).listen(8080);

// const express = require('express');
// const app = express();
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// })
// app.listen(3000);

const express = require('express');
const app = express()
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/books', function (req, res) {
    let autore = req.query.autore;
    let titolo = req.query.titolo;

    let parametri_di_ricerca = [];

    let dbquery = "select name, author from books";
    if (autore) {
       parametri_di_ricerca.push(" author like = '%"+autore+"%'");
    }
    if (titolo) {
        parametri_di_ricerca.push(" title like = '%" + titolo + "%'");
    }

    let queryfinale = dbquery;
    if (parametri_di_ricerca.length > 0) {
        queryfinale+= " WHERE";
        queryfinale+= parametri_di_ricerca.join("AND")
    }
    // for (i=0; i<parametri_di_ricerca.length; i++) {
    //     queryfinale += " " + parametri_di_ricerca[i];
    // }
    res.send('Ecco i tuoi libri per la ricerca: ' + queryfinale);
});
app.post('/', (req, res) => {
    res.send('Questo è il tuo libro');
})
app.listen(3000);