import fs from 'fs';
import sqlite3 from 'sqlite3';
import Sequelize from 'sequelize';
sqlite3.verbose();

//Add persist layer
class Data{
    constructor() {
        this.connString = 'sqlite:SqLiteDb';
        // this.exists = fs.existsSync(dbfile);
        // this.db = new sqlite3.Database(dbfile, (err) => {
        //     if (err) {
        //         console.error(err.message);
        //     }
        // });
        // this.initializeDatabase();
    }



    async testConnection(){
        try {
            const sequelize = new Sequelize(this.connString);
            await sequelize.authenticate();
            console.log('Connection has been established succesfully.');
            sequelize.close();
        } catch(error) {
            console.error('Unable to connect to the database.', error);
        }
    }
    //init sqlite debugger
    initializeDatabase(){

        // This should go, want to add migrations

        
        // if !exists = create
        // this.db.serialize(() => {
        //     if(! this.exists) {
        //         this.db.run(
        //             "CREATE TABLE Matches (id INTEGER PRIMARY KEY AUTOINCREMENT, result INTEGER, date DATETIME, slpGain INTEGER)"
        //         );
        //         console.log("Created Matches table");
        //         this.db.run(
        //             "CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, slpAmount INTEGER, cups INTEGER)"
        //         );
        //         console.log("Created Users table");

        //         this.db.serialize(() => {
        //             this.db.run (
        //                 "INSERT INTO Matches (result) VALUES (1),(2),(2),(3),(1)"
        //             );
        //         });
        //     } 
        // });
    }
}

export default Data;


