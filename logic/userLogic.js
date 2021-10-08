var models = require('../models');

class UserLogic{
    constructor(){
        
    }
    
    async createUser(name, slp, cups, isDefault = false) {
        const user = await models.User.create({name: name, slpAmount: slp, cupsAmount: cups, isDefault: isDefault});
        return user;
    }

    async getUsers(){
        return await models.User.findAll();
    }
}

module.exports = UserLogic;