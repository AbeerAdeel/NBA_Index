# Mongo qurires for organizing database and getting results from db
from pymongo import MongoClient
import scrape_data
import pandas as pd

cluster = 'mongodb+srv://aadeel:Andrew12@cluster0-frt96.mongodb.net/test?retryWrites=true&w=majority'
client = MongoClient(cluster)
db = client['NBA_Dataset']
collection = db['players']


# Uploads scraped data to Mongo
def uploadData(data):
    collection.insert_many(list(data))
    print("Sucessfully uploaded data to Mongo")


def updateTargets():
    df = pd.read_csv('current.csv')
    player_list = [{"name": row['Name'], "target": row['Target']}
                   for index, row in df.iterrows()]
    for player in player_list:
        name = player['name']
        target = player['target']
        print(name, target)
        collection.update({"Name": name}, {"$set": {"Target": target}})


def uploadAllData():
    uploadData(scrape_data.getPlayerInfo(
        'HOF', scrape_data.getHOFPlayerLinks(), False))
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getAllStarLinks(), False))
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getGeneralPlayerLinks(), False))
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getAllStarLinks(), True))
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getGeneralPlayerLinks(), True))


def updateNonHOF():
    # Messed up a little with intiatial scrape, these people are hall of famers as an exectuive or coach not a player so we have to update the target
    players = {"Al Attles",
               "Chuck Cooper",
               "Slick Leonard",
               "Tom Sanders",
               "Tom Heinsohn",
               "Jerry Sloan",
               "Phil Jackson",
               "Pat Riley",
               "Bill Sharman",
               "Earl Lloyd",
               "Larry Brown",
               "Alex Hannum",
               "Lenny Wilkens",
               "Red Holzman",
               "Don Barksdale",
               "Don Nelson",
               "John Thompson",
               "Alfred McGuire"}
    for player in players:
        collection.update_many({"Name": {"$eq": player}}, {
                               "$set": {"Target": "NA"}})


def getAllData():
    data = collection.find({}, {"_id": 0})
    return data


def getHOFPlayers():
    data = collection.find(
        {"$and": [{"Target": {"$eq": "HOF"}}, {
            "isActive": {"$eq": False}},
            {"PER": {"$ne": "NA"}},
            {"WS": {"$ne": "NA"}},
            {"PER": {"$exists": True}},
            {"WS": {"$exists": True}},
            {"Year Ended": {"$gt": 1980}},
        ]},
        {"_id": 0}
    )
    return data


def getNonHOFPlayers():
    data = collection.find(
        {"$and": [{"Target": {"$eq": "NA"}},
                  {"PER": {"$ne": "NA"}},
                  {"WS": {"$ne": "NA"}},
                  {"isActive": {"$eq": False}},
                  ]},
        {"_id": 0})
    return data


def getAllActivePlayers():
    data = collection.find(
        {"$and": [{"isActive": {"$eq": True}},
                  {"G": {"$gt": 175}},
                  ]},
        {"_id": 0})
    return data


def updateOtherData():
    df = pd.read_csv('player_data.csv')
    player_list = [{"name": row['name'], "position": row['position'],
                    "year_ended": row["year_end"]} for index, row in df.iterrows()]
    for player in player_list:
        name = player['name']
        position = player['position']
        year_end = int(player['year_ended'])
        print(name, position, year_end)
        collection.update(
            {"Name": name}, {"$set": {"Position": position, "Year Ended": year_end}})


def renameFields():
    collection.update_many({}, {"$rename": {'FG%': 'FG', 'FG3%': 'FG3', 'FT%': 'FT', 'eFG%': 'eFG', 'All Star': 'AS', 'ABA Champ': 'ABAChamp', 'BAA Champ': 'BAAChamp', 'ABA All Time': 'ABAAllTime', 'All-ABA': 'AllABA', 'All-BAA': 'AllBAA', 'Scoring Champ': 'ScoringChamp',
                                            'BLK Champ': 'BLKChamp', 'STL Champ': 'STLChamp', 'AST Champ': 'ASTChamp', 'NBA Champ': 'NBAChamp', 'All-NBA': 'AllNBA', 'All-Defensive': 'AllDefensive', 'All-Rookie': 'AllRookie', 'AS MVP': 'ASMVP', 'Def POY': 'DefPOY', 'Finals MVP': 'FinalsMVP', 'Year Ended': 'YearEnd'}})
