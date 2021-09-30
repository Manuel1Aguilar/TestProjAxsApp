import express from 'express';
import bodyParser from 'body-parser';
import MatchHistory from '../match-history/index.js';
import Data from '../data/index.js';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Axie API",
            description: "Axie match history project API",
            servers: ["http://localhost:3001"]
        }
    },
    apis: ["./app/index.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(bodyParser.urlencoded(({extended: true})));

const matchHistory = new MatchHistory();
const data = new Data();

app.use(bodyParser.json());

app.use(
    '/swagger',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs)
  );

//Calculate dmgs
//Use matches data
//Maybe get W/D/L

/** 
 * @swagger
 * /total-matches:
 *  get:
 *    description: Use to get the current match history
 *    responses: 
 *      '200': 
 *        description: A succesful response
*/
app.get('/total-matches', (req, res) => {
    res.json(matchHistory.calcTotalMatches());
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
