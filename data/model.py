from sklearn.utils import resample, class_weight
from collections import Counter
from mongo import getAllNonCurrentPlayers, getAllActivePlayers
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
pd.options.mode.chained_assignment = None


def getCleanDataSets():
    past_data = getAllNonCurrentPlayers()
    active_data = getAllActivePlayers()

    df = pd.DataFrame(past_data)
    df['Target'] = 'NA'
    df_active = pd.DataFrame(active_data)

    df_columns = list(df.columns)
    active_columns = list(df_active.columns)

    df[df_columns] = df[df_columns].replace({'NA': np.nan})
    df_active[active_columns] = df_active[active_columns].replace({
                                                                  'NA': np.nan})

    return df.fillna(0), df_active.fillna(0)


def getDataWithOutputs(df):
    # Rating = ((Win Shares / # of Games) * Player Efficiency Rating)) + sum(Awards)

    # Rating > 40.0 ----> Once in a Generation
    # 20.0 <= Rating < 40.0 ----> All Time Great
    # 10.0 <= Rating < 20.0 ----> All Star
    # 3.0 <= Rating < 10.0 ----> Quality Starter
    # 0 <= Rating < 3.0 ----> Role Player
    # Rating < 0 ----> Bench Player

    targets = []
    awards = ['MVP', 'AllNBA', 'NBAChamp', 'AS', 'AllDefensive',
              'ScoringChamp', 'BLKChamp', 'ASTChamp', 'TRBChamp', 'STLChamp']
    for index, row in df.iterrows():
        award_count = np.sum([float(row[i]) for i in awards])
        rating = float(((row['WS'] / row['G']) * row['PER']) + award_count)
        if rating >= 40.0:
            targets.append('Once in a Generation')
        elif rating >= 20.0 and rating < 40.0:
            targets.append('All Time Great')
        elif rating >= 10.0 and rating < 20.0:
            targets.append('All Star')
        elif rating >= 0.5 and rating < 10.0:
            targets.append('Average Player')
        elif rating < 0.5:
            targets.append('Bench Player')
    df['Target'] = np.array(targets)
    return df


def getDataframe():
    df = getDataWithOutputs(getCleanDataSets()[0])
    minority_category = ['Once in a Generation',
        'All Time Great', 'All Star', 'Average Player']
    df_majority = df[df['Target'] == 'Bench Player'][:700]
    print(df.Target.value_counts())
    lst = []
    for i in minority_category:
        df_minority = df[df['Target'] == i]
        df_minority_upsampled = resample(
            df_minority, replace=True, n_samples=700, random_state=123)
        lst.append(df_minority_upsampled)
    lst.append(df_majority)

    # df_minority = df[df['Target'] != 'Bench Player']

    df_upsampled = pd.concat(lst)
    return df_upsampled


def getInputOutput(df):
    columns = list(df.columns)
    columns.remove('Name')
    columns.remove('Target')
    targets = df['Target']
    values = df[columns].values
    print(len(df))
    print(len(columns))
    return values, targets


def makeModel():
    values = getInputOutput(getDataframe())[0]
    targets = getInputOutput(getDataframe())[1]

    print(len(values))

    le = LabelEncoder()

    X, y = values, targets
    X = X.astype('float32')
    y = le.fit_transform(y)

    # split into train and test datasets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)

    n_features = X_train.shape[1]

    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.Flatten(input_shape=(n_features,)))

    model.add(tf.keras.layers.Dense(units=32, activation='relu'))
    model.add(tf.keras.layers.Dense(units=5, activation='softmax'))
    model.compile(optimizer=tf.keras.optimizers.Adam(lr=0.001),
                  loss="sparse_categorical_crossentropy",
                  metrics=['accuracy'])
    model.fit(X_train, y_train, epochs=50, batch_size=256)

    # evaluate the model
    loss, acc = model.evaluate(X_test, y_test, verbose=0)
    print('Test Accuracy: %.3f' % acc)

    df = getCleanDataSets()[1].fillna(0)
    values = getInputOutput(df)[0].astype('float32')
    predictions = [np.argmax(i) for i in model.predict(values)]
    translate = le.inverse_transform(predictions)
    df = df.drop('Target', 1)
    df['Target'] = translate

    print('####### Once in a Generation #######')
    print(df[df['Target'] == 'Once in a Generation']['Name'])
    print('####### All Time Great #######')
    print(df[df['Target'] == 'All Time Great']['Name'])
    print('####### All Star #######')
    print(df[df['Target'] == 'All Star']['Name'])
    print('####### Average Player #######')
    print(df[df['Target'] == 'Average Player']['Name'])
    print('####### Bench Player #######')
    print(df[df['Target'] == 'Bench Player']['Name'])

    # other_df = getDataWithOutputs(getCleanDataSets()[0])
    # final_df = pd.concat([other_df, df])
    # final_df.to_csv('final.csv')

    return df


# df = pd.DataFrame(columns=['Name', 'Once in a Generation', 'All Time Great', 'All Star', 'Average Player', 'Bench Player'])
# names = [i['Name'] for i in getAllActivePlayers()]
# df['Name'] = names
# df = df.set_index('Name')
# df = df.fillna(0)
# for i in range(0, 1000):
#     target_df = makeModel()
#     for index, row in target_df.iterrows():
#         name = row['Name']
#         target = row['Target']
#         df.at[name, target] += 1
# df.to_csv('hello32.csv')

# df = pd.read_csv('hello32.csv').set_index('Name')
# columns = list(df.columns)
# names = []
# targets = []
# for index,row in df.iterrows():
#     values = list(row)
#     max_number_index = np.argmax(values)
#     target = columns[max_number_index]
#     if target == 'Average Player':
#         if np.max(values) < 500:
#             target = 'Quality Starter'
#         if values[4] > 150:
#             target = 'Bench Player'
#     names.append(index)
#     targets.append(target)
# new_df = pd.DataFrame(columns= ['Name', 'Target'])
# new_df['Name'] = names
# new_df['Target'] = targets
# new_df.to_csv('target.csv')



# other_df = getDataWithOutputs(getCleanDataSets()[0])
# df = pd.DataFrame(columns=['Name', 'Target'])
# df['Name'] = other_df['Name']
# df['Target'] = other_df['Target']
# df.to_csv('target_other.csv')

df1 = pd.read_csv('target.csv')
df2 = pd.read_csv('target_other.csv')
final_df = pd.concat([df2, df1])
final_df.to_csv('all_targets.csv')