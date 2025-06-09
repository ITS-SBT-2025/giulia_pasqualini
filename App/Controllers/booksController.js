const { BooksAwait, SaveBooks } = require('../utils/bookUtils');

async function getBooks(req, res) {
    const { autore, titolo } = req.query;
    const data = await BooksAwait();
    const filtered = data.filter(b =>
        (!autore || b.author.includes(autore)) &&
        (!titolo || b.title.includes(titolo))
    );
    res.json(filtered);
}

function getBookById(req, res) {
    const { idlibro } = req.params;
    if (idlibro) {
        res.send(`Nome libro trovato: ${idlibro}`);
    } else {
        res.status(404).send("Libro non trovato");
    }
}

async function createBook(req, res) {
    const { autore, titolo } = req.body;
    if (!autore || !titolo) {
        res.status(400).send("Errore: Devi specificare autore e titolo del libro");
        return;
    }

    const data = await BooksAwait();
    data.push({ title: titolo, author: autore });
    await SaveBooks(data);

    res.send(`Ho creato il tuo libro: ${titolo} scritto da ${autore}`);
}

async function searchBooks(req, res) {
    const { autore } = req.params;
    const { titolo } = req.query;
    const data = await BooksAwait();
    const filtered = data.filter(b =>
        b.author.includes(autore) &&
        (!titolo || b.title.includes(titolo))
    );
    res.json(filtered);
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    searchBooks
};