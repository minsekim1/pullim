import cron from 'node-cron';
import {zoomStartMsg, zoomEarlyMsg, zoomLink} from './template_list';
import sendKakaoMessage from './kakao_alim';
import { createMeeting } from '../zoom/zoom_meeting';


cron.schedule('0-59 * * * *', async() => {  //10분마다 실행
    const reservation_list = require('./reservation_list_db')
    const trainer_api_list = require('./trainer_api_list_db')
    console.log('실행중')
    const now = new Date(new Date().toString().slice(0,-23));
    console.log("****************************")
    const customerReservationList = await reservation_list;
    const clientApiList = await trainer_api_list;
    // console.log(customerReservationList)
    // console.log(clientApiList)
    console.log("****************************")

    try {
        for (let num in customerReservationList){
            //예약시간
            const client_restime = customerReservationList[num].reservation_time;

            //예약시간 - 1hour
            const early_1hour = new Date(client_restime.valueOf()); //shallow copy | 예약시간 - 1hour
            const early_1day = new Date(client_restime.valueOf()); //shallow copy | 예약시간 - 24hour
            early_1hour.setMinutes(early_1hour.getMinutes() - 60)
            early_1day.setMinutes(early_1day.getMinutes() - 1440)

            if(now.toString() === early_1hour.toString()){ //zoomEarlyMsg : 1시간 미리알림
                zoomEarlyMsg.to = customerReservationList[num].phone;
                zoomEarlyMsg.data = {
                    name:customerReservationList[num].name,
                    time: '1시간 후에',
                    mmdd: customerReservationList[num].reservation_time.toLocaleDateString(),
                    hhmm: customerReservationList[num].reservation_time.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer
                }
                sendKakaoMessage(zoomEarlyMsg) //고객에게 보내는 알림톡

                zoomEarlyMsg.to = customerReservationList[num].trainer_phone;
                sendKakaoMessage(zoomEarlyMsg) //트레이너에게 보내는 알림톡
            }
            if(now.toString() === early_1day.toString()){ //zoomEarlyMsg : 하루 미리알림
                zoomEarlyMsg.to = customerReservationList[num].phone;
                zoomEarlyMsg.data = {
                    name:customerReservationList[num].name,
                    time: '24시간 후에',
                    mmdd: customerReservationList[num].reservation_time.toLocaleDateString(),
                    hhmm: customerReservationList[num].reservation_time.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer
                }
                sendKakaoMessage(zoomEarlyMsg) //고객에게 보내는 알림톡

                zoomEarlyMsg.to = customerReservationList[num].trainer_phone;
                sendKakaoMessage(zoomEarlyMsg) //트레이너에게 보내는 알림톡
            }
            // console.log(clientApiList)
            if(now.toString() === client_restime.toString()){ //zoomEarlyMsg : 시작알림
                let zoomURL = []
                console.log("//////")
                for (let api in clientApiList ){
                    if (clientApiList[api].trainer_phone === customerReservationList[num].trainer_phone){
                        // console.log(clientApiList[api].trainer_phone)
                        const body = await createMeeting(clientApiList[api].api_key, clientApiList[api].api_sec).then(res => res.data);
                        // console.log(body.join_url)
                        zoomURL = body.join_url.replaceAll('https://','')
                    }
                }
                zoomLink.to = customerReservationList[num].phone
                zoomLink.data = {
                    name:customerReservationList[num].name,
                    time: '지금',
                    mmdd: customerReservationList[num].reservation_time.toLocaleDateString(),
                    hhmm: customerReservationList[num].reservation_time.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer,
                    URL: zoomURL
                }
                sendKakaoMessage(zoomLink) //고객에게 보내는 알림톡

                zoomLink.to = customerReservationList[num].trainer_phone;
                sendKakaoMessage(zoomLink) //트레이너에게 보내는 알림톡
            }
    }
    } catch (err) {
        console.error(err);
    }
});