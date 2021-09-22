import express from 'express';
import bodyParser from 'body-parser';
import MatchHistory from '../match-history/index.js';
import fs from 'fs';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const app = express();
app.use(bodyParser.urlencoded(({extended: true})));

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const matchHistory = new MatchHistory();

app.use(bodyParser.json());

//Add persist layer
//init sqlite debugger
const dbfile = './SqLiteDb';
const exists = fs.existsSync(dbfile);
const db = new sqlite3.Database(dbfile, (err) => {
    if (err) {
        console.error(err.message);
    }
});

// if !exists = create
db.serialize(() => {
    if(!exists) {
        db.run(
            "CREATE TABLE Matches (id INTEGER PRIMARY KEY AUTOINCREMENT, result INTEGER)"
        );
        console.log("Created db, matches table");

        db.serialize(() => {
            db.run (
                "INSERT INTO Matches (result) VALUES (1),(2),(2),(3),(1)"
            );
        });
    } 
    console.log("Database Matches ready to go");
    db.each("SELECT * from Matches", (err, row) => {
        if(err){
            console.error(err.message);
        }
        if(row) {
            console.log(`record: ${row.result}`);
        }
    });
});

//Calculate dmgs
//Use matches data
//Maybe get W/D/L
app.get('/total-matches', (req, res) => {
    res.json(matchHistory.calcTotalMatches());
});

app.post('/add-win', (req, res) => {
    const { slpAmount } = req.body;
    matchHistory.addWin(slpAmount);
    res.json(matchHistory.wins);
});

app.post('/add-draw', (req, res) => {
    const { slpAmount } = req.body;
    matchHistory.addDraw(slpAmount);
    res.json(matchHistory.draws);
});

app.post('/add-loss', (req, res) => {
    matchHistory.addLoss();
    res.json(matchHistory.losses);
});

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});
