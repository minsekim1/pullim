const cron = require('node-cron');
const customerReservationList = require('./customerReservationList');
const {zoomStartMsg, zoomEarlyMsg, zoomLink} = require('./template_list');
const sendKakaoMessage = require('./kakao_alim');
const { createMeeting } = require('../../zoomLink/create_zoomLink/zoommeeting');
const clientApiList = require('../../zoomLink/create_zoomLink/clientApiList');

cron.schedule('*/2 * * * * *', async() => {  //10분마다 실행
    console.log('실행중')
    const now = new Date(new Date().toString().slice(0,-23))

    try {
        for (let num in customerReservationList){
            //예약시간
            const client_restime = customerReservationList[num].zoomRsvTime;

            //예약시간 - 1hour
            const early_1hours = new Date(client_restime.valueOf()); //shallow copy
            early_1hours.setMinutes(early_1hours.getMinutes() - 30)

            if(now.toString() === early_1hours.toString()){ //zoomEarlyMsg : 미리알림
                zoomEarlyMsg.to = customerReservationList[num].phone;
                zoomEarlyMsg.data = {
                    name:customerReservationList[num].name,
                    time: '30분 후에',
                    mmdd: customerReservationList[num].zoomRsvTime.toLocaleDateString(),
                    hhmm: customerReservationList[num].zoomRsvTime.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer
                }

                ////////////트레이너에게도 전송
                sendKakaoMessage(zoomEarlyMsg) //고객에게 보내는 알림톡
            }
            // console.log(clientApiList)
            if(now.toString() === client_restime.toString()){ //zoomEarlyMsg : 시작알림
                let zoomURL = []
                console.log("//////")
                for (let api in clientApiList ){
                    if (clientApiList[api].phone === customerReservationList[num].trainer_phone){
                        console.log(clientApiList[api].phone)
                        const body = await createMeeting(clientApiList[api].API_KEY, clientApiList[api].API_SEC).then(res => res.data);
                        zoomURL = body.join_url.replaceAll('https://','')
                    }
                }
                zoomLink.to = customerReservationList[num].phone
                zoomLink.data = {
                    name:customerReservationList[num].name,
                    time: '지금',
                    mmdd: customerReservationList[num].zoomRsvTime.toLocaleDateString(),
                    hhmm: customerReservationList[num].zoomRsvTime.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer,
                    URL: zoomURL
                }
                
                ////////////트레이너에게도 전송
                sendKakaoMessage(zoomLink) //고객에게 보내는 알림톡
            }
    }
    } catch (err) {
        console.error(err);
    }
});