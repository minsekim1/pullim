const db = require('../dbtest/models/index');
const cron = require('node-cron');

cron.schedule('0-59 * * * *', async() => {
  module.exports = Promise.resolve(db.Reservation_list.findAll({
      attributes: [ 'name', 'phone', 'reservation_time', 'trainer', 'trainer_phone'],
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