const express = require('express');
const bodyParser = require('body-parser');
// import MatchHistory from '../logic/matchHistory.js';
const UserLogic = require('../logic/userLogic.js');
const Data = require('../data/index.js');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


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

// const matchHistory = new MatchHistory();
const data = new Data();
const userLogic = new UserLogic();

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
    // res.json(matchHistory.calcTotalMatches());
});

/** 
 * @swagger 
 * /user: 
 *   put: 
 *     description: Create or update user 
 *     parameters: 
 *     - name: User 
 *       description: User to create or update
 *       in: body 
 *       schema:
*          type: object
*          required:
*            - name
*            - slpAmount
*            - cupsAmount
*            - isDefault
*          properties:
*            id:
*              type: integer
*            name:
*              type: string
*            slpAmount:
*              type: integer
*            cupsAmount:
*              type: integer
*            isDefault:
*              type: boolean
 *     responses:  
 *       201: 
 *         description: Created  
 */  
app.put('/user', async (req, res) => {
    const { id, slpAmount, cupsAmount, name, isDefault } = req.body;
    const val = userLogic.save(id, name, slpAmount, cupsAmount, isDefault).then((user) =>{
        res.json(user);
    });
});

/** 
 * @swagger 
 * /user: 
 *   delete: 
 *     description: Create user 
 *     parameters: 
 *     - name: User 
 *       description: User to create 
 *       in: body 
 *       schema:
*          type: object
*          required:
*            - id
*          properties:
*            id:
*              type: integer
 *     responses:  
 *       201: 
 *         description: Created  
 */  
app.delete('/user', (req, res) => {
    const { id } = req.body;
    userLogic.delete(id).then(() =>{
        userLogic.get().then((users) =>{
            res.json(users);
        });
    });
    
});

/** 
 * @swagger 
 * /user: 
 *   get: 
 *     description: Create user 
 *     parameters: 
 *     - name: id 
 *       description: Id of user to retrieve 
 *       in: query 
 *       default: 0 
 *     responses:  
 *       201: 
 *         description: Users  
 */  
app.get('/user', (req, res) => {
    const id = req.query.id;
    userLogic.get(id).then((users) =>{
        res.json(users);
    });
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
    // matchHistory.addWin(slpAmount);
    console.log(slpAmount)
    // res.json(matchHistory.wins);
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
    // matchHistory.addDraw(slpAmount);
    // res.json(matchHistory.draws);
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
    // matchHistory.addLoss();
    res.json(matchHistory.losses);
}); 

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});
