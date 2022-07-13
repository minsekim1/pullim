const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios').default;

// const API_KEY1= "vW7c2BXWRz-8M1C1ivprFQ"
// const API_SEC1= "agQZXmkJmTBcKZe91jSULBTgMROeDTTnSerB"

const meetingdetails = { // 줌미팅 상세설정
    "topic": "The title of your zoom meeting",
    "type": 2,
    "start_time": "2019-06-14T10: 21: 57",
    "duration": "45",
    "timezone": "Asia/Korea",
    "agenda": "test",
    "recurrence": {
        "type": 1,
        "repeat_interval": 1
    },
    "settings": {
        "host_video": "true",
        "participant_video": "true",
        "join_before_host": "False",
        "mute_upon_entry": "False",
        "watermark": "true",
        "audio": "voip",
        "auto_recording": "cloud"
    }
}

function generateToken(API_KEY, API_SEC){ //JWT토큰 생성
    const timestamp = new Date().getTime();
    const header = {
        "alg":"HS256",
        "typ":"JWT"
    }
    const payload = {
        "iss":API_KEY,
        "exp":timestamp
    }
    const encodedHeader =  Buffer.from(JSON.stringify(header)).toString('base64').replace('=', '');
    const encodedPayload =  Buffer.from(JSON.stringify(payload)).toString('base64').replace('=', '');

    const signature = crypto.createHmac("sha256", API_SEC)
    .update(encodedHeader + '.' + encodedPayload)
    .digest("base64")
    .replaceAll("=", "")

    return encodedHeader + '.' + encodedPayload + '.' + signature //JWT Token
}

function createMeeting(API_KEY,API_SEC){ //줌링크 생성
    const headers = {
        'authorization': 'Bearer ' + generateToken(API_KEY, API_SEC), //'Bearer' + JWT토큰
        'content-type': 'application/json'
    }

    return axios({
        method: "post",
        url: 'https://api.zoom.us/v2/users/me/meetings',
        data: meetingdetails,
        headers: headers
    })
}

module.exports = { createMeeting }
