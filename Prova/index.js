import express from 'express';
import 'dotenv/config';
import * as productsRoute from './Components/Products/products.route.js';

const app = express();

app.use(express.json());
app.use('/Products', productsRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/About', (req, res) => {
    res.send('About');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});