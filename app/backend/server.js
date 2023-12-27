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

const db = require('./database.js');

const kontoRoutes = require('./routes/konto');
app.use('/api/konto', kontoRoutes);

const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

// Middleware for å parse JSON-laster
app.use(express.json());

// Håndterer GET-forespørsler til rot-URLen '/'
app.get('/', (req, res) => {
  res.send('Hello World!');
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
        //res.json({ message: 'Innlogging vellykket!', token: token });
        res.status(201).send({ message: 'Innlogging vellykket', token: token });
      } else {
        res.status(401).send('Feil navn eller passord');
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
      db.run('INSERT INTO users (username, email, password_hash, money) VALUES (?, ?, ?, ?)', [username, email, password_hash, money], function(err) {
        if (err) {
          res.status(500).send({ error: 'Databasefeil under opprettelse av ny bruker.' });
        } else {
            console.log(`Ny bruker opprettet med ID: ${this.lastID}`);
            const token = jwt.sign(
            { userId: this.lastID, username: username },
            `${process.env.JWT_SECRET}`, // Hemmeligheten bør lagres sikkert
            { expiresIn: '24h' } // Tokenet utløper etter 24 timer
          );
          res.status(201).send({ message: 'Ny bruker opprettet.', token: token });
        }
      });
    } catch (error) {
      res.status(500).send({ error: 'Feil under hashing av passord.' });
    }
  });
});

db.run('...', function(err) {
  console.log(this); // Se hva 'this' inneholder
  if (!err) {
    console.log(this.lastID);
  }
});


// Start serveren
app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});