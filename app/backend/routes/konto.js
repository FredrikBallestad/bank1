const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database.js');


// En middleware som verifiserer tokenet
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // Ingen token, uautorisert

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:");
      return res.sendStatus(403); // Token ikke gyldig, forbudt
    }
    console.log("ab");
    console.log(user);
    console.log("ab");

    req.user = user;
    req.userId = user.userId;
    req.username = user.username;
    next(); // Tokenet gyldig, fortsett til neste middleware/rutehandler
  });
};

// En rute som returnerer brukerens kontoopplysninger
router.get('/', authenticateToken, (req, res) => {
  // Bruker-IDen kan hentes fra req.user, som ble satt i authenticateToken middleware
  
  const userId = req.userId; 
  const brukernavn = req.username;
  
  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [userId], (err, row) => {
    if (err) {
      // Håndter feilen, f.eks. send en feilmelding tilbake til klienten
      res.status(500).json({ success: false, message: 'Databasefeil ved henting av brukerinfo.' });
    } else {
      // Ingen feil, send brukerdataen tilbake til klienten
      if (row) {
        res.json({
          success: true,
          message: 'Data hentet suksessfullt',
          data: row // Her sender vi hele raden som er hentet fra databasen
        });
      } else {
        // Ingen rad funnet for gitt id
        res.status(404).json({ success: false, message: 'Ingen bruker funnet med gitt ID.' });
      }
    }
  });
});

module.exports = router;
