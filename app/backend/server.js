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

      const money_brukskonto = 0;
      const brukskonto_account = await generateAccountNumber(1, 10);
      const brukskonto_account_number = parseInt(brukskonto_account);
      
      const money_sparekonto = 50000;
      const sparekonto_account = await generateAccountNumber(2, 10);
      const sparekonto_account_number = parseInt(sparekonto_account);

      const money_aksjesparekonto = 10;
      const aksjesparekonto_account = await generateAccountNumber(3, 10);
      const aksjesparekonto_account_number = parseInt(aksjesparekonto_account);

      const money_bsu = 0;
      const bsu_account = await generateAccountNumber(4, 10);
      const bsu_account_number = parseInt(bsu_account);

      db.run('INSERT INTO users (username, email, password_hash, money_brukskonto, brukskonto_account_number, money_sparekonto, sparekonto_account_number, money_aksjesparekonto, aksjesparekonto_account_number, money_bsu, bsu_account_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, email, password_hash, money_brukskonto, brukskonto_account_number, money_sparekonto, sparekonto_account_number, money_aksjesparekonto, aksjesparekonto_account_number, money_bsu, bsu_account_number], function(err) {
        
      /*const money = 50000;
      // Lagre den nye brukeren i databasen
      db.run('INSERT INTO users (username, email, password_hash, money) VALUES (?, ?, ?, ?)', [username, email, password_hash, money], function(err) {*/
        if (err) {
          res.status(500).send({ error: 'Databasefeil under opprettelse av ny bruker. Potensiell feil kan være at brukernavn eller kontonumre ikke er unike'});
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

//Lager unike tilfeldige kontonure for de ulike kontoene
async function generateAccountNumber(type, length) {
  let isUnique = false;
  let sequence = '';

  while (!isUnique) {
    sequence = type; // Start med kontotype

    for (let i = 0; i < length - 2; i++) { // -2 fordi vi legger til et siffer og et sjekksiffer senere
      sequence += Math.floor(Math.random() * 10).toString();
    }

    sequence += '0'; // Legger til et ekstra siffer

    // Beregner og legger til Luhns sjekksiffer
    const checkDigit = calculateLuhn(sequence);
    sequence = sequence.substring(0, sequence.length - 1) + checkDigit;

    // Sjekk om kontonummeret er unikt (pseudokode)
    isUnique = await checkIfAccountNumberIsUnique(sequence);
  }
  return sequence;
}

function checkIfAccountNumberIsUnique(accountNumber) {
  return new Promise((resolve, reject) => {
      db.get('SELECT id FROM users WHERE brukskonto_account_number = ? OR sparekonto_account_number = ? OR aksjesparekonto_account_number = ? OR bsu_account_number = ?', [accountNumber, accountNumber, accountNumber, accountNumber], (err, row) => {
          if (err) {
              reject(err);
          } else {
              resolve(!row);
          }
      });
  });
}

function calculateLuhn(digits) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i), 10);
      if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
  }
  return (10 - (sum % 10)) % 10;
}


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