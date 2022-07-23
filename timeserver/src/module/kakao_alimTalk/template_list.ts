interface ZoomMsgType {
    type?: string;
    templateCode?: string;
    to: string,
    data: {
        name:string;
        restime?: string;
        mmdd: string;
        hhmm: string;
        trainer:string;
        URL?:string;
        time?: string;
    }   
}

const zoomStartMsg: ZoomMsgType = {
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

const zoomEarlyMsg: ZoomMsgType = {
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

const zoomLink: ZoomMsgType = {
    templateCode: '14',
    to: 'num',
    data: {
        name:'', //customer_name
        restime: null, //new Data(예약시간)
        mmdd: null, //restime.toLocaleDateString()
        hhmm: null, //restime.toLocaleTimeString().slice(0,-3)
        trainer:'', //trainer_name
        URL:''
    }   
}
export {zoomStartMsg, zoomEarlyMsg, zoomLink, ZoomMsgType};