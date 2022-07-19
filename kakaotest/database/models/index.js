'use strict';

const Sequelize = require('sequelize');
const Reservation_list = require('./reservation_list');
const Trainer_api_list = require('./trainer_api_list');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Reservation_list = Reservation_list;
db.Trainer_api_list = Trainer_api_list;

Reservation_list.init(sequelize);
Trainer_api_list.init(sequelize);

Reservation_list.associate(db);
Trainer_api_list.associate(db);

// const reservation_list = Promise.resolve(Reservation_list.findAll({
//   attributes: [ 'name', 'phone', 'reservation_time', 'trainer', 'trainer_phone'],
// }))

// console.log('---------------------------')
// reservation_list.then((data) => {
//   console.log(data[0].name)
// });  
// // Promise.resolve(value)
// console.log('---------------------------')

module.exports = db;
