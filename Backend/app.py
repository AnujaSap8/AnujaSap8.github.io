from urllib.parse import quote_plus
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient

from CPT.cpt import cpt
from Login.login import login
from UserDetails.userDetails import userDetails
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

# < ======================== For Cloud Mongo DB ======================>

username = quote_plus('raptor_team')
password = quote_plus('01raptorteam01')

CONNECTION_STRING = "mongodb+srv://"+username + \
    ":"+password+"@cluster0.w1vzedx.mongodb.net/test"


client = MongoClient(CONNECTION_STRING)

# < ======================== For Local Mongo DB ======================>
# To initiate mongo db client i.e. our database client
# client = MongoClient('localhost', 27017)

db = client.Raptors
requ = db.users
appli = db.applications


@app.route("/SignUp", methods=["POST"])
def signUp():
    request_payload = request.json
    resp = login.signUp(request_payload)
    print(resp)
    return resp


@app.route("/applicationData", methods=["POST"])
def applicationData():
    request_payload = request.json
    resp = cpt.applicationData(request_payload)
    return resp


@app.route("/SignIn", methods=["POST"])
def signIn():
    request_payload = request.json

    resp = login.signIn(request_payload)
    print(resp)
    return resp


@app.route("/userData", methods=["POST"])
def userData():
    request_payload = request.json

    resp = userDetails.usersDetails(request_payload)
    print(resp)
    return resp


@app.route("/initiateApplication", methods=["POST"])
def initiateApplication():
    request_payload = request.json

    resp = cpt.initiateApplication(request_payload)
    return resp


@app.route("/applicationDetails", methods=["POST"])
def applicationDetails():
    request_payload = request.json
    resp = cpt.applicationDetails(request_payload)
    return resp


@app.route("/specificApplication", methods=["POST"])
def specificApplication():
    request_payload = request.json
    resp = cpt.specificApplication(request_payload)
    return resp


@app.route("/studentApplicationStatus", methods=["POST"])
def studentApplicationStatus():
    request_payload = request.json
    resp = cpt.studentAllInitiatedApplication(request_payload)
    return resp


@app.route("/updateApplicationStatus", methods=["POST"])
def updateApplicationStatus():
    request_payload = request.json
    resp = cpt.updateApplicationStatus(request_payload)
    return resp


@app.route("/updateAppliStatusDean", methods=["POST"])
def updateAppliStatus():
    request_payload = request.json
    resp = cpt.updateApplicationStatusDean(request_payload)
    return resp


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3010, debug=True)
