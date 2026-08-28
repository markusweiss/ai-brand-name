import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const APIKEY = process.env.MISTRAL_API_KEY;
const AI_URL =
  process.env.AI_URL || 'https://api.mistral.ai/v1/chat/completions';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/completions', async (req, res) => {
  console.log('\n--- Neue Anfrage vom Client erhalten ---');
  console.log('Nachricht:', req.body.message);
  console.log(
    'API-Key geladen?:',
    APIKEY ? `Ja (Länge: ${APIKEY.length} Zeichen)` : 'NEIN (undefined)'
  );

  if (!APIKEY) {
    console.error('Fehler: API_KEY ist in der Server-.env nicht definiert.');
    return res.status(500).json({ error: 'API_KEY fehlt auf dem Server!' });
  }

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${APIKEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [{ role: 'user', content: req.body.message }],
      max_tokens: 300
    })
  };

  try {
    const response = await fetch(AI_URL, options);
    let data = await response.json();

    if (!response.ok) {
      console.error(`API lieferte Status-Fehler ${response.status}:`, data);
      return res.status(response.status).send(data);
    }

    if (
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      const plainText = data.choices[0].message.content;
      data.choices[0].message.content = plainText.replace(/\*\*/g, '');
    }

    console.log('Erfolgreiche Antwort von API erhalten und bereinigt.');
    res.send(data);
  } catch (err) {
    console.error('Fataler Netzwerk- oder Codefehler:', err);
    res.status(500).send({ error: 'Fehler bei der Kommunikation mit AI' });
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('{/*any}', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('====================================');
  console.log('Server sucessful started!');
  console.log('Port is: ' + PORT);
  console.log('====================================');
});
