from pymongo.mongo_client import MongoClient

# < ======================== For Cloud Mongo DB ======================>
from urllib.parse import quote_plus

username = quote_plus('raptor_team')
password = quote_plus('01raptorteam01')

CONNECTION_STRING = "mongodb+srv://"+username +":"+password+"@cluster0.w1vzedx.mongodb.net/test"


client = MongoClient(CONNECTION_STRING)

# < ======================== For Local Mongo DB ======================>
# To initiate mongo db client i.e. our database client
# client = MongoClient('localhost', 27017)

db = client.Raptors
requ = db.users

class userDetails:
    def usersDetails(request_payload):
        uid = request_payload['uid']
        if(len(uid) == 0):
            msg = 'UID not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        existing_req = requ.find({"_id": str(uid)})
        results = list(existing_req)
        if len(results) > 0:
            msg = 'User Exists'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": results[0]
            }
            return resp
        else:
            msg = 'User Does not Exists'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
