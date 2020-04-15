# Mongo qurires for organizing database and getting results from db
from pymongo import MongoClient
import scrape_data
import pandas as pd
import numpy as np

cluster = 'mongodb+srv://aadeel:Andrew12@cluster0-frt96.mongodb.net/test?retryWrites=true&w=majority'
client = MongoClient(cluster)
db = client['NBA_Dataset']
collection = db['players']
stats_collection = db['stats']


# Uploads scraped data to Mongo
def uploadData(data, collection):
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
        'HOF', scrape_data.getHOFPlayerLinks(), False), collection)
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getAllStarLinks(), False), collection)
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getGeneralPlayerLinks(), False), collection)
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getAllStarLinks(), True), collection)
    uploadData(scrape_data.getPlayerInfo(
        'NA', scrape_data.getGeneralPlayerLinks(), True), collection)


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


def getAllNonCurrentPlayers():
    data = collection.find(
        {"$and": [{"isActive": {"$eq": False}},
                  {"PER": {"$ne": "NA"}},
                  {"WS": {"$ne": "NA"}},
                  {"PER": {"$exists": True}},
                  {"WS": {"$exists": True}},
                  {"YearEnded": {"$gt": 1980}}
                  ]},
        {"_id": 0, "College": 0, "Height": 0, "Weight": 0, "birthDate": 0,
            "imgFile": 0, "Position": 0, "ABA All-Time": 0, "AllABA": 0, "ABAChamp": 0, "isActive": 0, "YearEnded": 0, "AllBAA": 0, "BAA/NBA Champ": 0, "All-BAA/NBA": 0}
    )
    return data


def getAllActivePlayers():
    data = collection.find(
        {"$and": [{"isActive": {"$eq": True}},
                  {"G": {"$gt": 175}},
                  ]},
        {"_id": 0, "College": 0, "Height": 0, "Weight": 0, "birthDate": 0,
            "imgFile": 0, "Position": 0, "ABA All-Time": 0, "AllABA": 0, "ABAChamp": 0, "isActive": 0, "YearEnded": 0, "AllBAA": 0, "BAA/NBA Champ": 0, "All-BAA/NBA": 0})
    return data


def updateOtherData():
    df = pd.read_csv('player_data.csv')
    player_list = [{"name": row['name'], "position": row['position'],
                    "year_ended": row["year_end"], "college": row['college'], "height": row["height"], "weight": row['weight'], "birthDate": row['birth_date']} for index, row in df.iterrows()]
    for player in player_list:
        name = player['name']
        position = player['position']
        year_end = int(player['year_ended'])
        college = player['college']
        height = player['height']
        weight = player['weight']
        birthDate = player['birthDate']
        print(name, position, year_end)
        collection.update(
            {"Name": name}, {"$set": {"Position": position, "YearEnded": year_end, "College": college, "Height": height, "Weight": weight, "birthDate": birthDate}})


def renameFields():
    collection.update_many({}, {"$rename": {'FG%': 'FG', 'FG3%': 'FG3', 'FT%': 'FT', 'eFG%': 'eFG', 'All Star': 'AS', 'ABA Champ': 'ABAChamp', 'BAA Champ': 'BAAChamp', 'ABA All Time': 'ABAAllTime', 'All-ABA': 'AllABA', 'All-BAA': 'AllBAA', 'Scoring Champ': 'ScoringChamp',
                                            'BLK Champ': 'BLKChamp', 'STL Champ': 'STLChamp', 'AST Champ': 'ASTChamp', 'NBA Champ': 'NBAChamp', 'All-NBA': 'AllNBA', 'All-Defensive': 'AllDefensive', 'All-Rookie': 'AllRookie', 'AS MVP': 'ASMVP', 'Def POY': 'DefPOY', 'Finals MVP': 'FinalsMVP', 'YearEnd': 'YearEnded', 'TRB Champ': 'TRBChamp', 'Most Improved': 'MostImproved', 'Sixth Man': "SixthMan"}})


def createIndexes():
    collection.create_index("Name")


def uploadImageNames():
    for i in scrape_data.getImageNames(scrape_data.getAllLinks(), False):
        name = i['Name']
        imgFile = i['imgFile']
        collection.update(
            {"Name": name}, {"$set": {"imgFile": imgFile}})


def get_duplicate_cols(df: pd.DataFrame) -> pd.Series:
    return pd.Series(df.columns).value_counts()[lambda x: x > 1]

def temp():
    collection.update_many({"Target": "Role Player"}, {"$set": {"Target": "Average Player"}})
    collection.update_many({"Target": "Quality Starter"}, {"$set": {"Target": "Above Average Player"}})


def updateCareerStats():
    percent_columns = ['FTP', 'eFG', 'FG3', 'FGP']
    all_columns = ['Name', 'Year', 'Team', 'G', 'GS', 'FGP', 'FG3',
                   'eFG', 'FTP', 'MP', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PTS']

    df = pd.read_csv('PlayerStatisticsPerGame.csv').rename(columns={
        'Player': 'Name', 'year': 'Year', 'Tm': 'Team', 'FG%': 'FGP', '3P%': 'FG3', 'eFG%': 'eFG', 'FT%': 'FTP'})
    df[['Name']] = df[['Name']].fillna(value='NA')
    df = df.fillna(0)
    names = list(df['Name'])
    cleaned_names = [i.replace('*', '') for i in names if type(i) is str]
    df['Name'] = cleaned_names
    query = collection.find()

    # for index, row in df.iterrows():
    #     for column in calculated_columns:
    #         lst = []
    #         if row['G'] != 0.0:
    #             df.at[index,column] = float(row[column] / row['G'])
    #         else:
    #             df.at[index,column] = 0
    #     for column in ['FGP', '3PP', 'FTP', 'eFG']:
    #         df.at[index, column] = float(row[column]) * 100
    # df = df.round(1)

    # print(df[df['Name'] == 'LeBron James'].sort_values('Year'))

    for i in percent_columns:
        df[i] = df[i] * 100

    data = [i['Name'] for i in query]
    update_data = []
    all_data = []
    for i in data:
        update_data = []
        update_data.append(i)
        current_df = df[df['Name'] == i].sort_values('Year').round(1)
        for j in range(1, len(all_columns)):
            column = all_columns[j]
            lst = list(current_df[column])
            update_data.append(lst)
        if update_data[1] != [] and update_data[2] != []:
            all_data.append(dict(zip(all_columns, update_data)))
            print(dict(zip(all_columns, update_data)))
        update_data = []

    uploadData(all_data, stats_collection)

temp()