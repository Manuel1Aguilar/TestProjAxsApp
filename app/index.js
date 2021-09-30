import express from 'express';
import bodyParser from 'body-parser';
import MatchHistory from '../match-history/index.js';
import Data from '../data/index.js'

const app = express();
app.use(bodyParser.urlencoded(({extended: true})));

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const matchHistory = new MatchHistory();

app.use(bodyParser.json());

const data = new Data();

//Calculate dmgs
//Use matches data
//Maybe get W/D/L
app.get('/total-matches', (req, res) => {
    res.json(matchHistory.calcTotalMatches());
});

app.get('/test-conn', (req, res) => {

    console.log('Testing  connection');
    data.testConnection();
    res.json('end');
});

app.post('/create-user', (req, res) => {
    const { slpAmount, cupsAmount, name } = req.body;
    const users = [];
    data.db.serialize(() =>{
        data.db.run(`INSERT INTO Users (name, slpAmount, cups) VALUES ('${name}', ${slpAmount}, ${cupsAmount})`);
        data.db.each("SELECT * from Users", (err, row) =>{
            if(err){
                console.error(err.message);
            }
            if(row){
                console.log(row);
                users.push(`User:${row}`)
            }
        });
    });
    
    console.log(`Users: ${  users}`);
    res.json(users);
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
