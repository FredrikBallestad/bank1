require('dotenv').config({ path: '../../.env' });

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Aktiverer CORS for alle ruter
app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3001;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
console.log("hei");
console.log(process.env.JWT_SECRET)
console.log(jwtSecret);
console.log("hei");

const kontoRoutes = require('./routes/konto');
app.use('/api/konto', kontoRoutes);

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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Hent bruker fra databasen
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    if (user) {
      
      const match = await bcrypt.compare(password, user.password_hash);
      console.log('Passord match:', match);

      if (match) {
        
        // Bruker er funnet og passordet matcher, generer en JWT
          const token = jwt.sign(
          { userId: user.id, username: user.username },
          `${process.env.JWT_SECRET}`,
          //process.env.JWT_SECRET, // Husk å sette din JWT_SECRET i miljøet ditt
          { expiresIn: '24h' } // Tokenet utløper etter 24 timer
        );
        // Send tokenet tilbake til klienten
        res.json({ message: 'Innlogging vellykket!', token: token });
      } else {
        res.status(401).send('Feil vn eller passord');
      }
    } else {
      res.status(401).send('Feil brukernavn eller passord');
    }
  });
});

app.post('/Bli_Kunde', async (req, res) => {
  const { username,email, password } = req.body;

  // Valider input (eksempel: sjekk om passordet er sterkt nok, om e-posten er gyldig, osv.)

  // Sjekk om brukeren allerede finnes
  db.get('SELECT username FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      res.status(500).send({ error: 'Databasefeil under sjekk av brukernavn.' });
      return;
    }

    if (row) {
      res.status(409).send({ error: 'Brukernavn er allerede i bruk.' });
      return;
    }

    try {
      // Hash brukerens passord
      const password_hash = await bcrypt.hash(password, saltRounds);

      const money = 50000;
      // Lagre den nye brukeren i databasen
      db.run('INSERT INTO users (username, email, password_hash, money) VALUES (?, ?, ?, ?)', [username, email, password_hash, money], (err) => {
        if (err) {
          res.status(500).send({ error: 'Databasefeil under opprettelse av ny bruker.' });
        } else {
            const token = jwt.sign(
            { userId: this.lastID, username: username },
            `${process.env.JWT_SECRET}`, // Hemmeligheten bør lagres sikkert
            { expiresIn: '24h' } // Tokenet utløper etter 24 timer
          );
          console.log("hei");
          console.log(jwtSecret);
          console.log("hei");
          res.status(201).send({ message: 'Ny bruker opprettet.', token: token });
        }
      });
    } catch (error) {
      res.status(500).send({ error: 'Feil under hashing av passord.' });
    }
  });
});


/*const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Send en 401 Unauthorized hvis ingen token er funnet
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Send en 403 Forbidden hvis tokenet er ugyldig
    }
    req.user = user; // Tilordne brukerobjektet til request-objektet
    next(); // Fortsett til neste middelvare/rutehandler
  });
};*/



// Start serveren
app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});