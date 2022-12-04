from pymongo.mongo_client import MongoClient
from random import randrange
import re
from datetime import datetime

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
appli = db.applications


class cpt:

    def unique_id():
        irand = randrange(10000, 99999)
        existing_req = requ.find({"_id": str(irand)})
        results = list(existing_req)
        flg = False
        if (len(results) > 0):
            flg = True
        while (flg):
            irand = randrange(10000, 99999)
            existing_req = requ.find({"_id": str(irand)})
            results = list(existing_req)
            if (len(results) > 0):
                flg = True

        return irand

    def initiateApplication(request_payload):
        uid = request_payload['uid']
        employer_form = request_payload['employer_form']
        advisor_form = request_payload['advisor_form']
        existing_req = requ.find({"_id": str(uid)})
        results = list(existing_req)
        if (results[0]['roleId'] != 0):
            payload = {
                "statusCode": 501,
                "Message": "You need to be student to initate the Application"
            }
            return payload
        if (len(results[0]['initiatedApplication']) > 0):
            for i in results[0]['initiatedApplication']:
                status = i["status"]
                if (status == 'In Progress'):
                    payload = {
                        "statusCode": 501,
                        "Message": "One Application is already in progress"
                    }
                    return payload
                elif (status == 'Initiated'):
                    payload = {
                        "statusCode": 501,
                        "Message": "One Application is already in progress"
                    }
                    return payload
        a_id = cpt.unique_id()
        payload = {
            "_id": str(a_id),
            "uid": uid,
            "student_name": str(results[0]["firstName"]) + str(" ") + str(results[0]["lastName"]),
            "a_id": a_id,
            "employer_form": employer_form,        # Add Employer Form
            "advisor_form": advisor_form,         # Add Advisor Form
            "last_acted": datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S"),
            "as": {
                "acted_on": "",
                "status": "",
                "message": ""
            },
            "aa": {
                "acted_on": "",
                "status": "",
                "message": ""
            },
            "dean": {
                "acted_on": "",
                "status": "",
                "message": ""
            },
            "admin": {
                "acted_on": "",
                "status": "",
                "message": ""
            },
            "current_status": "Initiated",
            "next_approver": 1,
            "next_approver_role": 'Administrative Specialist',
            "deanApprovedForm": ''
        }
        payload_user = {
            "a_id": str(a_id),
            "status": "Initiated"
        }
        results[0]['initiatedApplication'].append(payload_user)
        if len(results[0]['initiatedApplication']) == 0:
            filter1 = {"_id": str(uid)}
            newvalues = {"$set": {"initiatedApplication": [payload_user]}}
            requ.update_one(filter1, newvalues)
        else:
            filter1 = {"_id": str(uid)}
            requ.replace_one(filter1, results[0], upsert=True)

        appli.insert_one(payload)
        msg = "Application Initiated with id: "+str(a_id)
        resp = {
            "Status Code": 501,
            "Message": msg,
            "data": payload
        }
        return resp

    def applicationDetails(request_payload):
        aid = request_payload['a_id']
        existing_req = appli.find({"_id": (aid)})
        results = list(existing_req)
        print(len(results))
        if (len(results) == 0):
            msg = "Application Not found"
            payload = {
                "msg": msg,
                "statusCode": 501,
                "data": ''
            }
            return payload
        else:
            msg = "Application Found"
            payload = {
                "msg": msg,
                "statusCode": 501,
                "data": results[0]
            }
            return payload

    def specificApplication(request_payload):
        role_id = request_payload['role_id']
        existing_req = appli.find()
        results = list(existing_req)

        if (len(results) == 0):
            msg = "No Application Initiated"
            payload = {
                "msg": msg,
                "statusCode": 501,
                "data": ''
            }
            return payload
        else:
            allApplications = []
            for i in results:
                if (i['next_approver'] == role_id):
                    allApplications.append(i)
            msg = "Curated List according to role id"
            payload = {
                "msg": msg,
                "statusCode": 201,
                "data": allApplications
            }
            return payload
    
    def applicationData(request_payload):
        uid = request_payload['uid']
        existing_appli = appli.find()
        results = list(existing_appli)
        appli_data = []
        for i in results:
            if(i["uid"] == uid):
                appli_data.append(i)
        payload = {
            "msg": 'msg',
            "statusCode": 201,
            "data": appli_data
        }
        return payload

    def studentAllInitiatedApplication(request_payload):
        uid = request_payload['uid']
        existing_req = requ.find({"_id": str(uid)})
        results = list(existing_req)
        if (len(results) <= 0):
            msg = "User Not Found"
            payload = {
                "msg": msg,
                "statusCode": 201,
                "data": ''
            }
            return payload

        if (len(results[0]['initiatedApplication']) <= 0):
            msg = "No application initiated"
            payload = {
                "msg": msg,
                "statusCode": 201,
                "data": []
            }
            return payload

        else:
            msg = "Applications found"
            payload = {
                "msg": msg,
                "statusCode": 201,
                "data": results[0]['initiatedApplication']
            }
            return payload

    def updateApplicationStatus(request_payload):
        aid = request_payload['a_id']
        status = request_payload['status']
        roleid = request_payload['role_id']
        existing_appli = appli.find({"_id": str(aid)})
        results_appli = list(existing_appli)
        uid = results_appli[0]['uid']
        existing_user = requ.find({"_id": (uid)})
        results_user = list(existing_user)

        appli_list = results_user[0]['initiatedApplication']
        if(results_appli[0]['next_approver'] == ''):
            msg = "All Approvers has already performed there action"
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        for idx, obj in enumerate(appli_list):
            if (obj['a_id'] == str(aid)):
                appli_list.pop(idx)

        if(
            results_appli[0]['current_status'] == "Rejected by Administrative Specialist" or
            results_appli[0]['current_status'] == "Rejected by Academic Advisor" or
            results_appli[0]['current_status'] == "Rejected by Dean"
        ):
            if(results_appli[0]['next_approver'] == 1):
                msg = "Application Rejected by Administrative Specialist"
            elif(results_appli[0]['next_approver'] == 2):
                msg = "ApplicationRejected by Academic Advisor"
            elif(results_appli[0]['next_approver'] == 3):
                msg = "Application Rejected by Dean"
            
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(status == "Approved"):
            appli_status = ''
            if(int(roleid) == 1):
                appli_status = 'Approved by Administrative Specialist'
            elif(int(roleid) == 2):
                appli_status = 'Approved by Academic Advisor'
            elif(int(roleid) == 3):
                appli_status = 'Approved by Dean'
            payload_appli_user = {
                "a_id": aid,
                "status": appli_status
            }

            appli_list.append(payload_appli_user)

            results_user[0]['initiatedApplication'] = appli_list

            filter_user = {"_id": str(uid)}
            requ.replace_one(filter_user, results_user[0], upsert=True)
            print(results_appli)
            if (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 1):
                results_appli[0]["as"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["last_acted"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["as"]["status"] = status
                results_appli[0]["as"]["message"] = appli_status
            elif (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 2):
                results_appli[0]["aa"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["last_acted"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["aa"]["status"] = status
                results_appli[0]["aa"]["message"] = appli_status
            elif (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 3):
                results_appli[0]["dean"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["last_acted"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["dean"]["status"] = status
                results_appli[0]["dean"]["message"] = appli_status
            else:
                msg = "Next approver and RoleId sent does not match"
                resp = {
                    "Status Code": 501,
                    "Message": msg,
                    "data": ''
                }
                return resp


            if (int(roleid) == 1):
                results_appli[0]['next_approver'] = 2
                results_appli[0]['next_approver_role'] = 'Academic Advisor'
            elif (int(roleid) == 2):
                results_appli[0]['next_approver'] = 3
                results_appli[0]['next_approver_role'] = 'Dean'
            elif (int(roleid) == 3):
                results_appli[0]['next_approver'] = ''
                results_appli[0]['next_approver_role'] = ''
            
            if(int(roleid) == 1):
                results_appli[0]['current_status'] = 'Approved by Administrative Specialist'
            elif(int(roleid) == 2):
                results_appli[0]['current_status'] = 'Approved by Academic Advisor'
            elif(int(roleid) == 3):
                results_appli[0]['current_status'] = 'Approved by Dean'

            filter_appli = {"_id": str(aid)}
            appli.replace_one(filter_appli, results_appli[0], upsert=True)

            msg = "Application updated with id: "+str(aid)
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        elif(status == "Rejected"):
            appli_status = ''
            if(int(roleid) == 1):
                appli_status = 'Rejected by Administrative Specialist'
            elif(int(roleid) == 2):
                appli_status = 'Rejected by Academic Advisor'
            elif(int(roleid) == 3):
                appli_status = 'Rejected by Dean'
            payload_appli_user = {
                "a_id": aid,
                "status": appli_status
            }

            appli_list.append(payload_appli_user)

            results_user[0]['initiatedApplication'] = appli_list

            filter_user = {"_id": str(uid)}
            requ.replace_one(filter_user, results_user[0], upsert=True)


            if (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 1):
                results_appli[0]["as"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["as"]["status"] = status
                results_appli[0]["as"]["message"] = appli_status
                results_appli[0]["next_approver"] = ''
                results_appli[0]["next_approver_role"] = ''
            elif (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 2):
                results_appli[0]["aa"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["aa"]["status"] = status
                results_appli[0]["aa"]["message"] = appli_status
                results_appli[0]["next_approver"] = ''
                results_appli[0]["next_approver_role"] = ''
            elif (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 3):
                results_appli[0]["dean"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["dean"]["status"] = status
                results_appli[0]["dean"]["message"] = appli_status
                results_appli[0]["next_approver"] = ''
                results_appli[0]["next_approver_role"] = ''
            else:
                msg = "Next approver and RoleId sent does not match"
                resp = {
                    "Status Code": 501,
                    "Message": msg,
                    "data": ''
                }
                return resp

            results_appli[0]['next_approver'] = ''
            # if (int(roleid) == 1):
            #     results_appli[0]['next_approver'] = ''
            # elif (int(roleid) == 2):
            #     results_appli[0]['next_approver'] = 3
            # elif (int(roleid) == 3):
            #     results_appli[0]['next_approver'] = ''
            
            if(int(roleid) == 1):
                results_appli[0]['current_status'] = 'Rejected by Administrative Specialist'
            elif(int(roleid) == 2):
                results_appli[0]['current_status'] = 'Rejected by Academic Advisor'
            elif(int(roleid) == 3):
                results_appli[0]['current_status'] = 'Rejected by Dean'

            filter_appli = {"_id": str(aid)}
            appli.replace_one(filter_appli, results_appli[0], upsert=True)

            msg = "Application updated with id: "+str(aid)
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        else:
            msg = "Status not rightly defined"
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
    
    def updateApplicationStatusDean(request_payload):
        aid = request_payload['a_id']
        status = request_payload['status']
        roleid = '3'
        deanForm = request_payload['deanFormData']

        existing_appli = appli.find({"_id": str(aid)})
        results_appli = list(existing_appli)
        uid = results_appli[0]['uid']
        existing_user = requ.find({"_id": (uid)})
        results_user = list(existing_user)

        appli_list = results_user[0]['initiatedApplication']
        if(results_appli[0]['next_approver'] == ''):
            msg = "All Approvers has already performed there action"
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp

        for idx, obj in enumerate(appli_list):
            if (obj['a_id'] == str(aid)):
                appli_list.pop(idx)

        if(
            results_appli[0]['current_status'] == "Rejected by Administrative Specialist" or
            results_appli[0]['current_status'] == "Rejected by Academic Advisor" or
            results_appli[0]['current_status'] == "Rejected by Dean"
        ):
            if(results_appli[0]['next_approver'] == 1):
                msg = "Application Rejected by Administrative Specialist"
            elif(results_appli[0]['next_approver'] == 2):
                msg = "ApplicationRejected by Academic Advisor"
            elif(results_appli[0]['next_approver'] == 3):
                msg = "Application Rejected by Dean"
            
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        if(status == "Approved"):
            appli_status = 'Approved by Dean'
            payload_appli_user = {
                "a_id": aid,
                "status": appli_status
            }

            appli_list.append(payload_appli_user)

            results_user[0]['initiatedApplication'] = appli_list

            filter_user = {"_id": str(uid)}
            requ.replace_one(filter_user, results_user[0], upsert=True)
            print(results_appli)
            if (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 3):
                results_appli[0]["dean"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["last_acted"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["dean"]["status"] = status
                results_appli[0]["dean"]["message"] = appli_status
                results_appli[0]["deanApprovedForm"] = deanForm
            else:
                msg = "Next approver and RoleId sent does not match"
                resp = {
                    "Status Code": 501,
                    "Message": msg,
                    "data": ''
                }
                return resp


            results_appli[0]['next_approver'] = ''
            results_appli[0]['next_approver_role'] = ''
            
            results_appli[0]['current_status'] = 'Approved by Dean'

            filter_appli = {"_id": str(aid)}
            appli.replace_one(filter_appli, results_appli[0], upsert=True)

            msg = "Application updated with id: "+str(aid)
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        elif(status == "Rejected"):
            appli_status = 'Rejected by Dean'
            payload_appli_user = {
                "a_id": aid,
                "status": appli_status
            }

            appli_list.append(payload_appli_user)

            results_user[0]['initiatedApplication'] = appli_list

            filter_user = {"_id": str(uid)}
            requ.replace_one(filter_user, results_user[0], upsert=True)

            if (int(roleid) == results_appli[0]['next_approver'] and int(roleid) == 3):
                results_appli[0]["dean"]["acted_on"] = datetime.now().strftime(
                    "%d/%m/%Y %H:%M:%S")
                results_appli[0]["dean"]["status"] = status
                results_appli[0]["dean"]["message"] = appli_status
                # results_appli[0]["advisor_form"] = deanForm
                results_appli[0]["next_approver"] = ''
                results_appli[0]["next_approver_role"] = ''
            else:
                msg = "Next approver and RoleId sent does not match"
                resp = {
                    "Status Code": 501,
                    "Message": msg,
                    "data": ''
                }
                return resp

            results_appli[0]['next_approver'] = ''
            # if (int(roleid) == 1):
            #     results_appli[0]['next_approver'] = ''
            # elif (int(roleid) == 2):
            #     results_appli[0]['next_approver'] = 3
            # elif (int(roleid) == 3):
            #     results_appli[0]['next_approver'] = ''
            
            results_appli[0]['current_status'] = 'Rejected by Dean'

            filter_appli = {"_id": str(aid)}
            appli.replace_one(filter_appli, results_appli[0], upsert=True)

            msg = "Application updated with id: "+str(aid)
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp
        
        else:
            msg = "Status not rightly defined"
            resp = {
                "Status Code": 501,
                "Message": msg,
                "data": ''
            }
            return resp


