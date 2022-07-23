import crypto from "crypto";
import axios from "axios";
import {ZoomMsgType} from './template_list';
require("dotenv").config({ path: "../.env" });

function makeSignature() {
  var space = " "; // one space
  var newLine = "\n"; // new line
  var method = "POST"; // method
  var timestamp = Date.now().toString(); // current timestamp (epoch)
  var accessKey = process.env.NAVER_ACCESSKEY; // access key ids
  var secretKey = process.env.NAVER_SECRETKEY; // secret key
  const url2 = `/alimtalk/v2/services/${process.env.NAVER_CHANNEL_ID}/messages`;
  let message = [];
  let hmac = crypto.createHmac("sha256", secretKey);

  message.push(method);
  message.push(space);
  message.push(url2);
  message.push(newLine);
  message.push(timestamp);
  message.push(newLine);
  message.push(accessKey);
  return hmac.update(message.join("")).digest("base64").toString();
}

const getRequestParams = ({ type, to, data }: ZoomMsgType) => {
  if (type === "12") {
    return {
      templateCode: type,
      plusFriendId: process.env.MYCH,
      messages: [
        {
          to,
          content: `비대면 진료가 ${data.time} 시작됩니다.

신청자: ${data.name}
진행일자: ${data.mmdd}, ${data.hhmm}
담당자: ${data.trainer}

          ※주의 사항`,
          buttons: [
            {
              type: "WL",
              name: "입장하기",
              linkMobile: "https://www.naver.com/",
              linkPc: "https://www.naver.com/",
            },
          ],
        },
      ],
    };
  }
  if (type === "13") {
    return {
      templateCode: type,
      plusFriendId: process.env.MYCH,
      messages: [
        {
          to,
          content: `비대면 진료가 ${data.time} 시작됩니다.

신청자: ${data.name}
진행일자: ${data.mmdd}, ${data.hhmm}
담당자: ${data.trainer}

          ※주의 사항`,
          buttons: [
            {
              type: "WL",
              name: "안내 사항",
              linkMobile: "https://www.naver.com/",
              linkPc: "https://www.naver.com/",
            },
          ],
        },
      ],
    };
  }
  if (type === "14") {
    console.log(data.URL);
    return {
      templateCode: type,
      plusFriendId: process.env.MYCH,
      messages: [
        {
          to,
          content: `비대면 진료가 ${data.time} 시작됩니다.

신청자: ${data.name}
진행일자: ${data.mmdd}, ${data.hhmm}
담당자: ${data.trainer}

          ※주의 사항`,
          buttons: [
            {
              type: "AL",
              name: "입장하기",
              schemeAndroid: `https://${data.URL}`,
              schemeIos: `https://${data.URL}`,
            },
          ],
        },
      ],
    };
  }
};

const sendKakaoMessage = async ({ templateCode, to, data }: ZoomMsgType) => {
  const params = getRequestParams({ type: templateCode, to, data });
  try {
    const { data: result } = await axios.post(
      `https://sens.apigw.ntruss.com/alimtalk/v2/services/${process.env.NAVER_CHANNEL_ID}/messages`,
      params,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-ncp-apigw-timestamp": Date.now().toString(),
          "x-ncp-iam-access-key": process.env.NAVER_ACCESSKEY,
          "x-ncp-apigw-signature-v2": makeSignature(),
        },
      }
    );

    console.log("과연? ", result);
  } catch (error) {
    console.log(error);
  }
};

export default sendKakaoMessage;
