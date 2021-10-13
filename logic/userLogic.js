const models = require('../models');
const { Op } = require("sequelize");

class UserLogic{
    constructor(){
    }
    
    async save(userId, userName, userSlpAmount, userCupsAmount, userIsDefault){
        let u = await this.getByUserId(userId);
        if(u.length > 0){
            await this.update(userId, userName, userSlpAmount, userCupsAmount, userIsDefault);
            return userId;
        } else { 
            let user = await this.create(userName, userSlpAmount, userCupsAmount, userIsDefault);
            userId = user.id;
            return userId
        }
        
    }

    async create(userName, userSlpAmount, userCupsAmount, userIsDefault) {

        const user = await models.User.create({name: userName, slp: userSlpAmount, cups: userCupsAmount, isDefault: userIsDefault});
        return user;
    }

    async update(userId, userName, userSlpAmount, userCupsAmount, userIsDefault) {

        const user = await models.User.update({ 
            name: userName,
            slp: userSlpAmount,
            cups: userCupsAmount,
            isDefault: userIsDefault }, {
            where: {
              id: userId
            }
        });
        return user;

    }
    async delete(userId){
        await models.User.destroy({
            where: {
              id: userId
            }
          });
    }
    async getByUserId(userId){
        let where = {
                id: userId
            }
        
        return await models.User.findAll({
            where: where
          });
    }
    async get(){
        return await models.User.findAll();
    }
}

module.exports = UserLogic;