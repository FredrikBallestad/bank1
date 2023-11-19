const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // Aktiverer CORS for alle ruter
app.use(express.json());
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3001;

const bcrypt = require('bcrypt');
const saltRounds = 10;

// Middleware for å parse JSON-laster
app.use(express.json());

// Håndterer GET-forespørsler til rot-URLen '/'
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Koble til SQLite-databasen
const db = new sqlite3.Database('../../profiles.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Håndter GET-forespørsler til '/users'
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Grunnleggende feilhåndtering
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Hent bruker fra databasen
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    
    if (user) {
      // Sjekk at passordet matcher
      const match = await bcrypt.compare(password, user.password_hash);
      
      if (match) {
        res.send('Innlogging vellykket!');
        // Sett opp en session eller token her om nødvendig
      } else {
        res.status(401).send('Feil brukernavn eller passord');
      }
    } else {
      res.status(401).send('Feil brukernavn eller passord');
    }
  });
});

// Start serveren
app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});