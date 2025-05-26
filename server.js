const express = require('express'); //Express szerver importálása
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('cikk.db');

app.use(cors());
app.use(express.json());

// Statikus fájlok kiszolgálása a /public mappából
app.use(express.static(path.join(__dirname, 'public')));

// Tábla létrehozása, ha nem létezik
db.run(`
    CREATE TABLE IF NOT EXISTS Cikk (
        cikk_id INTEGER PRIMARY KEY AUTOINCREMENT,
        cim TEXT,
        szerzo TEXT,
        publikacio_datuma TEXT,
        kategoria TEXT,
        tartalom TEXT
    )
`);

// POST kérés fogadása
app.post('/cikk', async (req, res) => {
    const { cim, szerzo, publikacio_datuma, kategoria, tartalom } = req.body;

    const stmt = `INSERT INTO Cikk (cim, szerzo, publikacio_datuma, kategoria, tartalom) VALUES (?, ?, ?, ?, ?)`;

    db.run(stmt, [cim, szerzo, publikacio_datuma, kategoria, tartalom], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Adatmentési hiba');
        }
        res.status(200).json({ message: 'Sikeres mentés', id: this.lastID });
    });
});
// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut: http://localhost:${PORT}`);
});
