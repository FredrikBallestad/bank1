const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database.js');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN


  if (token == null) return res.sendStatus(401); // Ingen token, uautorisert

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:");
      return res.sendStatus(403); // Token ikke gyldig, forbudt
    }
    req.userId = user.userId;
    next(); // Tokenet gyldig, fortsett til neste middleware/rutehandler
  });
};


const transferMoney = (userId, fromAccountId, toAccountId, amount) => {
  return new Promise((resolve, reject) => {

    if (Number(userId) !== Number(fromAccountId)) {
      return reject(new Error("Kontoen tilhører ikke den autentiserte brukeren."));
    }

    db.serialize(() => {
      db.run("BEGIN TRANSACTION;");

      const debitQuery = "UPDATE users SET money_sparekonto = money_sparekonto - ? WHERE id = ? AND money_sparekonto >= ?";
      const creditQuery = "UPDATE users SET money_sparekonto = money_sparekonto + ? WHERE id = ?";

      db.run(debitQuery, [amount, fromAccountId, amount], function (err) {
        if (err) {
          db.run("ROLLBACK;");
          return reject(err);
        }
        if (this.changes !== 1) {
          db.run("ROLLBACK;");
          return reject(new Error("Kan ikke trekke beløpet fra kontoen."));
        }

        db.run(creditQuery, [amount, toAccountId], function (err) {
          if (err) {
            db.run("ROLLBACK;");
            return reject(err);
          }
          if (this.changes !== 1) {
            db.run("ROLLBACK;");
            return reject(new Error("Kan ikke legge til beløpet til kontoen."));
          }

          db.run("COMMIT;", function (err) {
            if (err) {
              db.run("ROLLBACK;");
              return reject(err);
            }
            resolve(); // Transaksjonen ble vellykket
          });
        });
      });
    });
  });
};

router.post('/', authenticateToken, async (req, res) => {
    try {

      const userId = req.userId;

      const { fromAccountId, toAccountId, amount, date, mesaage} = req.body;
      
      // Validering og logikk for å trekke beløpet fra avsender og legge til hos mottaker
      // ...
      // Kall funksjonen for å overføre penger
    await transferMoney(userId, fromAccountId, toAccountId, amount);
    res.send({ success: true, message: 'Overføringen ble gjennomført.' });
  } catch (error) {
    // Håndter eventuelle feil som oppstår
    res.status(500).send({ success: false, message: error.message });
    }
  });



  module.exports = router;
  