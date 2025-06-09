const fs = require('fs').promises;
const path = require('path');

async function BooksAwait() {
    const data = [];
    try {
        const content = await fs.readFile(path.join(__dirname, '../data/books.dat'), 'utf8');
        content.split('\n').forEach(line => {
            const [title, author] = line.trim().split(';');
            if (title && author) {
                data.push({ title, author });
            }
        });
    } catch (err) {
        console.error(err);
    }
    return data;
}

async function SaveBooks(data) {
    try {
        const content = data.map(book => `${book.title};${book.author}`).join('\n');
        await fs.writeFile(path.join(__dirname, '../data/books.dat'), content, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    BooksAwait,
    SaveBooks
};