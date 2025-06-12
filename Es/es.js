//Import
import "dotenv/config";
import express from 'express';
import pageRoute from './Components/Pages/pages.route.js';
import productRoute from './Components/Products/products.route.js';
const app = express()

//Middleware
app.use(express.urlencoded({ extended: true }));
// app.use(req, res, next => {
//     console.log("Questo è un middleware");
//     next();
// });
// app.use(req, res, next => {
//     console.log("Anche questo è un middleware");
//     next();
// });

app.use(pageRoute);
app.use(productRoute);
app.use((req, res) => { 
    res.status(404).send("Pagina non trovata.");
});

//Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// import http from 'http';
// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello World!");
//   } else if (req.url === "/about" && req.method === "GET") {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.end("About");
//   } else if (req.url === "/dream" && req.method === "GET") {
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.end("I want to go home, please.");
//   } else {
//     res.writeHead(404, {"Content-Type": "text/plain"});
//     res.end("Pagina non trovata.");
//   }
// });