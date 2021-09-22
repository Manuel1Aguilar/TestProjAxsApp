import express from 'express';
import bodyParser from 'body-parser';
import MatchHistory from '../match-history/index.js';


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const matchHistory = new MatchHistory();

app.use(bodyParser.json());

//Add persist layer
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
