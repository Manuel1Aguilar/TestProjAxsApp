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

/** 
 * @swagger 
 * /create-user: 
 *   post: 
 *     description: Create user 
 *     parameters: 
 *     - name: User 
 *       description: User to create 
 *       in: body 
 *       schema:
*          type: object
*          required:
*            - name
*            - slpAmount
*            - cupsAmount
*          properties:
*            name:
*              type: string
*            slpAmount:
*              type: integer
*            cupsAmount:
*              type: integer
 *     responses:  
 *       201: 
 *         description: Created  
 */  
app.post('/create-user', (req, res) => {
    const { slpAmount, cupsAmount, name } = req.body;
    console.log(slpAmount);
    console.log(cupsAmount);
    console.log(name);
    res.json(req.body);
});
/** 
 * @swagger
 * /add-win: 
 *   post: 
 *     description: Adds a win
 *     parameters: 
 *     - name: SLP 
 *       description: SLP won on this match 
 *       in: body 
 *       schema:
*          type: object
*          required:
*            - slpAmount
*          properties:
*            slpAmount:
*              type: integer
 *     responses:  
 *       201: 
 *         description: Created  
*/
app.post('/add-win', (req, res) => {
    const { slpAmount } = req.body;
    console.log(slpAmount)
    matchHistory.addWin(slpAmount);
    console.log(slpAmount)
    res.json(matchHistory.wins);
});
/** 
 * @swagger
 * /add-draw: 
 *   post: 
 *     description: Adds a draw to match history
 *     parameters: 
 *     - name: SLP 
 *       description: SLP won on this match 
 *       in: body 
 *       schema:
*          type: object
*          required:
*            - slpAmount
*          properties:
*            slpAmount:
*              type: integer
 *     responses:  
 *       201: 
 *         description: Created  
*/
app.post('/add-draw', (req, res) => {
    const { slpAmount } = req.body;
    matchHistory.addDraw(slpAmount);
    res.json(matchHistory.draws);
});
/** 
 * @swagger
 * /add-loss:
 *  post:
 *    description: Adds loss to match history
 *    responses: 
 *      '200': 
 *        description: Created
*/
app.post('/add-loss', (req, res) => {
    matchHistory.addLoss();
    res.json(matchHistory.losses);
}); 

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});
