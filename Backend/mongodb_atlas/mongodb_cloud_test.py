from pymongo import MongoClient
from pandas import DataFrame

from urllib.parse import quote_plus
username = quote_plus('raptor_team')
password = quote_plus('01raptorteam01')

def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    # CONNECTION_STRING = "mongodb+srv://user:pass@cluster.mongodb.net/myFirstDatabase"
    CONNECTION_STRING = "mongodb+srv://"+username +":"+password+"@cluster0.w1vzedx.mongodb.net/test"
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['UNT_CASCADE_DB']


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":
    # Get the database
    dbname = get_database()
    collection_name = dbname['APPLICATIONS']

    item_1 = {
        "_id": "UNT00001",
        "item_name": "Course Exception",
        "category": "Course Exception",
        "submit_date": "25-Sept_2022",
        "state": "initial"


    }

    item_2 = {
        "_id": "UNT00002",
        "item_name": "LAB",
        "category": "LAB",
        "submit_date": "25-Sept_2022",
        "state": "initial"

    }
    item_3 = {
        "_id": "UNT00003",
        "item_name": "CPT",
        "category": "CPT",
        "submit_date": "25-Sept_2022",
        "state": "initial"
    }
    collection_name.insert_many([item_1, item_2, item_3])
    item_details = collection_name.find()
    items_df = DataFrame(item_details)
    print(items_df)

