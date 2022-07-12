import jwt
import requests
import json
from time import time
import sys
# with open('client_api_list.json') as f:
#     API_object = json.load(f)

# API_KEY= "vW7c2BXWRz-8M1C1ivprFQ"
# API_SEC= "agQZXmkJmTBcKZe91jSULBTgMROeDTTnSerB"

# Enter your API key and your API secret

# create a function to generate a token
# using the pyjwt library

def generateToken(API_KEY, API_SEC):
  token = jwt.encode(

    # Create a payload of the token containing
    # API Key & expiration time
    {'iss': API_KEY, 'exp': time() + 5000},

    # Secret used to generate token signature
    API_SEC,

    # Specify the hashing alg
    algorithm='HS256'
  )
  return token.encode().decode('utf-8')


# create json data for post requests
meetingdetails = {"topic": "The title of your zoom meeting",
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

# send a request with headers including
# a token and meeting details

def createMeeting(API_KEY, API_SEC):
    headers = {'authorization': 'Bearer ' + generateToken(API_KEY, API_SEC),
              'content-type': 'application/json'}
    r = requests.post(
        f'https://api.zoom.us/v2/users/me/meetings',
        headers=headers, data=json.dumps(meetingdetails))
  
    # print("\n creating zoom meeting ... \n")
    # print(r.text)
    # converting the output into json and extracting the details
    y = json.loads(r.text)
    join_URL = y["join_url"]
    meetingPassword = y["password"]
  
    print(join_URL+','+meetingPassword)
    return(join_URL,meetingPassword)

# createMeeting(API_KEY, API_SEC)  
# # run the create meeting function
if __name__ == '__main__':
  createMeeting(sys.argv[1], sys.argv[2])