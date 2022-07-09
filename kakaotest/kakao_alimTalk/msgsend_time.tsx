const cron = require('node-cron');
import './customerReservationList';
const {zoomStartMsg, zoomEarlyMsg, zoomLink} = require('./template_list.tsx');
const sendKakaoMessage = require('./kakao_alim');
const { makeLink } = require('../../create_zoomLink/create_meeting_py');
const client_api_list = require('../../create_zoomLink/client_api_list.json')

cron.schedule('0-59 * * * *', async() => {
    console.log('실행중')
    const date = new Date();
    const day = date.toLocaleDateString();
    const time = date.toLocaleTimeString().slice(0,-3);
    const now = day.toString() + time.toString();
    console.log(now)

    try {
        for (let num in customerReservationList){
            //예약시간
            const client_restime = customerReservationList[num].zoomRsvTime;
            const clt_day = client_restime.toLocaleDateString(); //년. 월. 일
            const clt_time = client_restime.toLocaleTimeString().slice(0,-3); //시간 hh:mm
            const res_moment = clt_day.toString() + clt_time.toString();

            //예약시간 - 1hour
            const early_1hours = new Date(customerReservationList[num].zoomRsvTime.valueOf()); //shallow copy
            early_1hours.setMinutes(early_1hours.getMinutes() - 30)
            const early_day = early_1hours.toLocaleDateString(); //년. 월. 일
            const early_time = early_1hours.toLocaleTimeString().slice(0,-3); //시간 hh:mm
            const res_early = early_day.toString() + early_time.toString();

            if(now === res_early){ //zoomEarlyMsg : 미리알림
                zoomEarlyMsg.to = customerReservationList[num].phone;
                zoomEarlyMsg.data = {
                    name:customerReservationList[num].name,
                    time: '30분 후에',
                    mmdd: customerReservationList[num].zoomRsvTime.toLocaleDateString(),
                    hhmm: customerReservationList[num].zoomRsvTime.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer
                }
                console.log(zoomEarlyMsg)
                // console.log("메세지 전송시간" + Date())

                ////////////트레이너에게도 전송
                sendKakaoMessage(zoomEarlyMsg)
            }

            if(now === res_moment){ //zoomEarlyMsg : 시작알림
                let [link_URL, link_PW]:any = null
                for (let api in client_api_list ){
                    if (client_api_list[api].phone === customerReservationList[num].phone){
                        [ link_URL, link_PW ] = makeLink(client_api_list[api].API_KEY, client_api_list[api].API_SEC)
                    }
                }
                zoomLink.to = customerReservationList[num].phone
                zoomLink.data = {
                    name:customerReservationList[num].name,
                    time: '지금',
                    mmdd: customerReservationList[num].zoomRsvTime.toLocaleDateString(),
                    hhmm: customerReservationList[num].zoomRsvTime.toLocaleTimeString().slice(0,-3),
                    trainer:customerReservationList[num].trainer,
                    URL: link_URL
                }
                console.log(zoomLink)
                // console.log("메세지 전송시간" + Date())
                
                ////////////트레이너에게도 전송
                sendKakaoMessage(zoomLink)
            }
    }
    } catch (err) {
        console.error(err);
    }
});