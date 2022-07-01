# 라이브러리 호출
import requests
import json

#웹주소 복붙하면 code 뜸 -> data:code에 복붙
#https://kauth.kakao.com/oauth/authorize?client_id={REST API 키}&redirect_uri=https://localhost:3000&response_type=code&scope=talk_message,friends

# 카카오톡 메시지 API
url = "https://kauth.kakao.com/oauth/token"

data = {
    "grant_type" : "authorization_code",
    "client_id" : "7d4d22aa8628fef08cae71f2a75111e5",
    "redirect_url" : "https://localhost:3000",
    "code" : "IuPlIbhx5VSiHxmmgQx0QlAnUKLXaaw6qKPm68nLeeH1doINRPfUdSNRdE-HHU_L1EZjOgo9cpgAAAGBrrXSWA"
}
response = requests.post(url, data=data)
tokens = response.json()
print(tokens)

# 카카오톡 메시지 API
url = "https://kauth.kakao.com/oauth/token"

data = {
    "grant_type": "refresh_token",
    "client_id": "7d4d22aa8628fef08cae71f2a75111e5",
    "refresh_token": "6jgg5Xaqv72Qv6c4MHlnttUB-lxoDoUvVKvYfd_WCj1y6wAAAYGoNN-c"
}
response = requests.post(url, data=data)
tokens = response.json()

# kakao_code.json 파일 저장
with open("kakao_code.json", "w") as fp:
    json.dump(tokens, fp)
    
# 카카오 API 엑세스 토큰
with open("./kakao_code.json", "r") as fp:
    tokens = json.load(fp)    

print(tokens["access_token"])

url = "https://kapi.kakao.com/v1/api/talk/friends" #친구 목록 가져오기
header = {"Authorization": 'Bearer ' + tokens["access_token"]}

result = json.loads(requests.get(url, headers=header).text)
friends_list = result.get("elements")

print(friends_list)

friend_id = friends_list[0].get("uuid")
print(friend_id)

# 카카오톡 메시지
url= "https://kapi.kakao.com/v1/api/talk/friends/message/default/send"
header = {"Authorization": 'Bearer ' + tokens["access_token"]}
print(tokens["access_token"])

data={
    'receiver_uuids': '["{}"]'.format(friend_id),
    "template_object": json.dumps({
        "object_type":"text",
        "text":"줌 링크",
        "link":{
            "web_url" : "https://zoom.us/j/97651256167?pwd=TVJXbnVyLzdwTUVNSmUzbDlYMkFNdz09",
            "mobile_web_url" : "https://zoom.us/j/97651256167?pwd=TVJXbnVyLzdwTUVNSmUzbDlYMkFNdz09"
        },
        "button_title": "줌 입장"
    })
}

response = requests.post(url, headers=header, data=data)
response.status_code

