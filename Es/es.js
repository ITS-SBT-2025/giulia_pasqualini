//Import
import "dotenv/config";
import express from 'express';
import pageRoute from './Components/Pages/pages.route.js';
import productRoute from './Components/Products/products.route.js'
import userRoute from './Components/Users/users.route.js';

const app = express()

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(req, res, next => {
//     console.log("Questo è un middleware");
//     next();
// });
// app.use(req, res, next => {
//     console.log("Anche questo è un middleware");
//     next();
// });

app.use(pageRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

app.use((req, res) => { 
    res.status(404).send("Pagina non trovata.");
});

app.use((err, req, res, next) => {
  if (err.status >= 400 && err.status <= 499) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err.stack);

    res.status(500).json({ error: "Qualcosa è andato storto!" });
  }
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