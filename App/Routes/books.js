const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBookById,
    createBook,
    searchBooks
} = require('../controllers/booksController');

router.get('/', getBooks);

router.get('/autore/:autore', searchBooks);

router.get('/:idlibro', getBookById);

router.post('/', createBook);

module.exports = router;