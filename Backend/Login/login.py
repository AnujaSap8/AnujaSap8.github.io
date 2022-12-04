from pymongo.mongo_client import MongoClient
from random import randrange
import re
def check(s):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    if re.fullmatch(regex, s):
        return False
    else:
        return True




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

class login:

    def unique_id():
        irand = randrange(10000, 99999)
        existing_req = requ.find({"_id": str(irand)})
        results = list(existing_req)
        flg = False
        if(len(results)>0):
            flg = True
        while(flg):
            irand = randrange(10000, 99999)
            existing_req = requ.find({"_id": str(irand)})
            results = list(existing_req)
            if(len(results)>0):
                flg = True
        
        return irand

    def signUp(request_payload):
        email = request_payload['email']
        password = request_payload['password']
        confirmPassword = request_payload['confirmPassword']
        role = request_payload['role']
        firstName = request_payload['firstName']
        lastName = request_payload['lastName']
        nationality = request_payload['nationality']
        uid = request_payload['uid']
        middleName = request_payload['middleName']
        if(len(uid) == 0):
            msg = 'UID not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if((uid.isdigit()) == False):
            msg = 'Please enter valid StudentID/Employee'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(len(email) == 0):
            msg = 'Email not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if (check(email)):
            msg = 'Email is Not Valid'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(len(password) == 0):
            msg = 'Password not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(len(role) == 0):
            msg = 'role type not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        if(len(firstName) == 0):
            msg = 'First Name not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        if(len(lastName) == 0):
            msg = 'Last Name not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(len(nationality) == 0):
            msg = 'Nationality not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        existing_req = requ.find({"_id": str(uid)})
        results = list(existing_req)
        if len(results) > 0:
            msg = 'User with this UID Already Exists'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(password != confirmPassword):
            msg = 'Password is not Matching'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        role_id = ''

        if(role == "Student"):
            role_id = 0
        elif(role == "Administrative Specialist"):
            role_id = 1
        elif(role == "Academic Advisor"):
            role_id = 2
        elif(role == "Dean"):
            role_id = 3
        elif(role == "Admin"):
            role_id = 4
        
        payload ={
            "_id": str(uid),
            "roleId": role_id,
            "uid": uid,
            "email": email,
            "password": password,
            "role": role,
            "firstName": firstName,
            "lastName": lastName,
            "nationality": nationality,
            "middleName": middleName,
            "initiatedApplication": []
        }
        requ.insert_one(payload)
        msg = "Role Registered"
        resp ={
            "statusCode": 501,
            "Message": msg,
            "data": payload
        }
        return resp

    def signIn(request_payload):
        uid = request_payload['uid']
        password = request_payload['password']
        if(len(uid) == 0):
            msg = 'UID not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(len(password) == 0):
            msg = 'Password not inserted'
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        existing_req = requ.find({"_id": str(uid)})
        results = list(existing_req)
        if len(results) > 0:
            if(results[0]['password'] == password):
                msg = 'User Exists'
                payload = {
                    "status": "Login Successful",
                    "role_id": results[0]['roleId']
                }
                resp = {
                    "Status Code": 501,
                    "Message": msg,
                    "data": payload
                }
                return resp
            else:
                msg = 'Invalid Password'
                payload = {
                    "status": "Failure"
                }
                resp = {
                    "Status Code": 501,
                    "Message": msg,
                    "data": payload
                }
                return resp
        else:
            msg = 'Invalid UID'
            payload = {
                "status": "Failed"
            }
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": payload
            }
            return resp

