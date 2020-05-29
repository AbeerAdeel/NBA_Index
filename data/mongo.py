# Mongo qurires for organizing database and getting results from db
from pymongo import MongoClient
import scrape_data
import pandas as pd
import numpy as np
import unidecode
import math

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
    df = pd.read_csv('all_targets.csv')
    for index, row in df.iterrows():
        print(row['Name'], row['Target'])
        collection.update({"Name": row['Name']}, {
                          "$set": {"Target": row['Target']}})


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
                  {"YearEnded": {"$gt": 1980}},
                  {"G": {"$gt": 200}}
                  ]},
        {"_id": 0, "College": 0, "Height": 0, "Weight": 0, "birthDate": 0,
            "imgFile": 0, "Position": 0, "ABA All-Time": 0, "AllABA": 0, "ABAChamp": 0, "isActive": 0, "YearEnded": 0, "AllBAA": 0, "BAA/NBA Champ": 0, "All-BAA/NBA": 0, "Archetype": 0}
    )
    return data


def updateOtherData():
    df = pd.read_csv('player_data.csv')
    player_list = [{"name": row['name'], "position": row['position'],
                    "year_ended": row["year_end"], "college": row['college'], "height": row["height"], "weight": row['weight'], "birthDate": row['birth_date']} for index, row in df.iterrows()]
    for player in player_list:
        name = player['name']
        year_end = int(player['year_ended'])
        print(name, year_end)
        collection.update(
            {"Name": name}, {"$set": {"YearEnded": year_end}})


def getAllPlayers():
    data = collection.find(
        {"$and": [{"PER": {"$ne": "NA"}},
                  {"WS": {"$ne": "NA"}},
                  {"PER": {"$exists": True}},
                  {"WS": {"$exists": True}},
                  {"YearEnded": {"$gt": 1980}},
                  {"G": {"$gt": 200}}
                  ]},
        {"_id": 0, "College": 0, "Height": 0, "Weight": 0, "birthDate": 0,
            "imgFile": 0, "Position": 0, "ABA All-Time": 0, "AllABA": 0, "ABAChamp": 0, "isActive": 0, "YearEnded": 0, "AllBAA": 0, "BAA/NBA Champ": 0, "All-BAA/NBA": 0, "Archetype": 0})
    return data


def renameFields():
    collection.update_many({}, {"$rename": {'FG%': 'FG', 'FG3%': 'FG3', 'FT%': 'FT', 'eFG%': 'eFG', 'All Star': 'AS', 'ABA Champ': 'ABAChamp', 'BAA Champ': 'BAAChamp', 'ABA All Time': 'ABAAllTime', 'All-ABA': 'AllABA', 'All-BAA': 'AllBAA', 'Scoring Champ': 'ScoringChamp',
                                            'BLK Champ': 'BLKChamp', 'STL Champ': 'STLChamp', 'AST Champ': 'ASTChamp', 'NBA Champ': 'NBAChamp', 'All-NBA': 'AllNBA', 'All-Defensive': 'AllDefensive', 'All-Rookie': 'AllRookie', 'AS MVP': 'ASMVP', 'Def POY': 'DefPOY', 'Finals MVP': 'FinalsMVP', 'YearEnd': 'YearEnded', 'TRB Champ': 'TRBChamp', 'Most Improved': 'MostImproved', 'Sixth Man': "SixthMan"}})


def createIndexes():
    collection.create_index("Name")


def uploadImageNames():
    images = scrape_data.getImageNames(scrape_data.getAllLinks(), False)
    for i in images:
        name = unidecode.unidecode(i['Name'])
        imgFile = i['imgFile']
        print(name, imgFile)
        collection.update(
            {"Name": name}, {"$set": {"imgFile": imgFile}})


def updateDecodeEuropeanNames():
    data = getAllData()
    names = [i['Name'] for i in data]
    for name in names:
        unaccented_string = unidecode.unidecode(name)
        print(name, unaccented_string)
        collection.update(
            {'Name': name}, {"$set": {"Name": unaccented_string}})


def updatePlayerInfo():
    data = pd.DataFrame(collection.find({})).fillna('NA')
    names = list(data['Name'])

    df = pd.read_csv('all_seasons.csv')
    heights = []
    weights = []
    for index, row in df.iterrows():
        calculated_feet = str(
            round((0.0328 * row['player_height']), 2)).split('.')
        if len(calculated_feet[1]) == 1:
            str_feet = calculated_feet[0] + "-" + calculated_feet[1]
        else:
            str_feet = calculated_feet[0] + "-" + calculated_feet[1][0]
        usweight = int(float(row['player_weight']) * 2.2046)
        heights.append(str_feet)
        weights.append(usweight)
    df['weight'] = weights
    df['height'] = heights
    for i in names:
        current = df[df['player_name'] == i]
        if len(current) > 0:
            row = current.iloc[len(current) - 1]
            print(i, row['height'], row['weight'], row['college'])
            collection.update({"Name": i}, {"$set": {"Height": str(row['height']), "Weight": int(row['weight']), "College": str(
                row['college'])}})


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


def updatePositions():
    df = pd.read_csv('PlayerStatisticsPerGame.csv').fillna("None")
    names = [unidecode.unidecode(name) for name in df['Player']]
    cleaned_names = [i.replace('*', '') for i in names if type(i) is str]
    df['Player'] = cleaned_names
    data = collection.find({})
    names = [i['Name'] for i in data]
    print(names)
    for name in names:
        current_df = df[df['Player'] == name]
        if len(current_df) >= 1:
            lst = list(current_df['Pos'])
            position = max(set(lst), key=lst.count)
            print(name, position)
            collection.update({"Name": name}, {"$set": {"Position": position}})


def generateActiveStatsData():
    data = stats_collection.find(
        {"isActive": True}, {"_id": 0, "Team": 0, "isActive": 0})
    lst = []
    for i in data:
        df = pd.DataFrame(i).sort_values(by=['Year'], ascending=False)
        length = len(df)
        if length > 0:
            current_df = df.head(2).drop(['Year'], axis=1)
            series = dict(current_df.mean())
            series['Name'] = list(current_df['Name'])[0]
            lst.append(series)
    all_df = pd.DataFrame(lst)
    all_df.to_csv('current_stats.csv', index=None)


def updatePlayerMarketValue():
    df = pd.read_csv('players.csv', index_col=[0])
    for index, row in df.iterrows():
        name = row['Name']
        value = row['marketValue']
        print(name, value)
        collection.update({'Name': name}, {"$set": {"marketValue": value}})

def updatePlayerAverageSalary():
    data = scrape_data.getAverageSalary()
    for i in data:
        name = i['Name']
        avg = i['avgSalary']
        print(name, avg)
        collection.update({'Name': name}, {"$set": {"avgSalary": avg}})
