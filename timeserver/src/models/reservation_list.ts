import Sequelize from 'sequelize';

export default class Reservation_list extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id:{
                type: Sequelize.INTEGER(),
                allowNull:false,
                primaryKey: true
            },
            name:{
                type: Sequelize.STRING(5),
                allowNull:false,
            },
            phone:{
                type: Sequelize.STRING(11),
                allowNull:false,
            },
            reservation_time:{
                type: Sequelize.DATE(),
                allowNull:false,
            },
            trainer:{
                type: Sequelize.STRING(10),
                allowNull:false,
            },
            trainer_phone:{
                type: Sequelize.STRING(11),
                allowNull:false,
            },
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Reservation_list',
            tableName: 'reservation_list',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
    static associate(db) {
        db.Reservation_list.belongsTo(db.Trainer_api_list, { foreignKey: 'trainer_phone', targetKey: 'trainer_phone'})
    }
};