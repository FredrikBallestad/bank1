const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



// En middleware som verifiserer tokenet
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // Ingen token, uautorisert

  console.log(token)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:");
      return res.sendStatus(403); // Token ikke gyldig, forbudt
    }
    req.user = user;
    next(); // Tokenet gyldig, fortsett til neste middleware/rutehandler
  });
};

// En rute som returnerer brukerens kontoopplysninger
router.get('/', authenticateToken, (req, res) => {
  // Bruker-IDen kan hentes fra req.user, som ble satt i authenticateToken middleware
  const userId = req.user.id;

  // Her ville du legge til logikk for å hente brukerens data basert på userId fra din database
  // For eksempel:
  // db.query('SELECT * FROM users WHERE id = ?', [userId], function(err, result) {
  //   if (err) throw err;
  //   res.json(result);
  // });

  // For nå, la oss bare sende tilbake et enkelt respons
  //res.json({ id: userId, brukernavn: 'DummyBruker', saldo: 1000 });
  res.json({
    success: true,
    message: 'Data hentet suksessfullt',
    data: {
      id: userId,
      brukernavn: 'DummyBruker',
      saldo: 1000
    }
  });
});

module.exports = router;
