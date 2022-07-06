const zoomStartMsg = {
    templateCode: '12',
    to: 'num',
    data: {
        name:'', //customer_name
        restime: null, //new Data(예약시간)
        mmdd: null, //restime.toLocaleDateString()
        hhmm: null, //restime.toLocaleTimeString().slice(0,-3)
        trainer:'' //trainer_name
    }   
}

const zoomEarlyMsg = {
    templateCode: '13',
    to: 'num',
    data: {
        name:'', //customer_name
        restime: null, //new Data(예약시간)
        mmdd: null, //restime.toLocaleDateString()
        hhmm: null, //restime.toLocaleTimeString().slice(0,-3)
        trainer:'' //trainer_name
    }   
}

module.exports = {zoomStartMsg, zoomEarlyMsg}