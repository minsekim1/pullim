const db = require('../dbtest/models/index');
const cron = require('node-cron');

cron.schedule('0-59 * * * *', async() => {
  module.exports = Promise.resolve(db.Trainer_api_list.findAll({
    attributes: [ 'trainer_phone', 'api_key', 'api_sec' ],
    })).then((data) => {
      let arr = []
      console.log('---------------------------')
      for(let i in data){
        arr.push(data[i].dataValues)
      }
      console.log(arr)
      console.log('---------------------------')
      return arr;
    });
});