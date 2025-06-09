function logger(req, res, next) {
    console.log(`Richiesta ricevuta: metodo=${req.method}, url=${req.url}`);
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).send("Metodo non supportato");
    }
    next();
}

module.exports = logger;