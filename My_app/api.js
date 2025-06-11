const fetch = require('node-fetch');

app.get('/gameInfo/:id', async (req, res) => {
  const gameId = req.params.id;
  const apiKey = 'la_tua_chiave_api';
  const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`);
  const data = await response.json();

  // Analizza la descrizione del gioco per determinare la presenza di ragni
  const descrizione = data.description_raw.toLowerCase();
  const contieneRagni = descrizione.includes('spider') || descrizione.includes('ragno');

  res.json({ nome: data.name, contieneRagni });
});