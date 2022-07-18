const Sequelize = require('sequelize');

module.exports = class Trainer_api_list extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            trainer_phone:{
                type: Sequelize.STRING(11),
                allowNull:false,
                primaryKey: true
            },
            api_key:{
                type: Sequelize.STRING(25),
                allowNull:false,
            },
            api_sec:{
                type: Sequelize.STRING(40),
                allowNull:false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Trainer_api_list',
            tableName: 'trainer_api_list',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Trainer_api_list.hasMany(db.Reservation_list, { foreignKey: 'trainer_phone', sourceKey: 'trainer_phone'})
    }
};