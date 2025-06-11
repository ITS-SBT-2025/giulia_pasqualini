const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/videogiochi', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema per l'utente
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Schema per il videogioco
const gameSchema = new mongoose.Schema({
  nome: String,
  presenzaRagni: Boolean,
  aggiuntoDa: mongoose.Schema.Types.ObjectId,
});

// Modelli
const User = mongoose.model('User', userSchema);
const Game = mongoose.model('Game', gameSchema);

// Middleware
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Rotta per la registrazione
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('Utente registrato');
});

// Rotta per il login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'segreto');
    res.cookie('authToken', token, { httpOnly: true });
    res.send('Login effettuato');
  } else {
    res.status(401).send('Credenziali non valide');
  }
});

// Rotta per aggiungere un videogioco
app.post('/addGame', async (req, res) => {
  const { nome, presenzaRagni } = req.body;
  const token = req.cookies.authToken;
  if (!token) return res.status(401).send('Non autenticato');

  try {
    const decoded = jwt.verify(token, 'segreto');
    const game = new Game({ nome, presenzaRagni, aggiuntoDa: decoded.userId });
    await game.save();
    res.status(201).send('Videogioco aggiunto');
  } catch (err) {
    res.status(400).send('Errore nell\'aggiunta del videogioco');
  }
});

// Rotta per ottenere i videogiochi
app.get('/games', async (req, res) => {
  const games = await Game.find();
  res.json(games);
});

// Avvio del server
app.listen(3001);