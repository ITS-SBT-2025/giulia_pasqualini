console.log('Hello, World!');

// const http = require('http');
// http.createServer(function(req, res) {
//     res.writeHead(200,
//         {'Content-Type': 'text/plain'});
//     res.write('Hello, World!!!\n');
//     res.end();
// }).listen(8000);

const http = require('http');
http.createServer(function(req, res) {
    if (req.url === '/books') {
    res.writeHead(404,
        {'Content-Type': 'text/plain'});
    res.write('Non ci sono libri qui!\n');
    res.end();
    } else {
    res.writeHead(200,
        {'Content-Type': 'text/plain'});
    res.write('Hello, World!!!\n');
    res.end();
    }
}).listen(8080);