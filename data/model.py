from mongo import getHOFPlayers, getNonHOFPlayers, getAllActivePlayers
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
pd.options.mode.chained_assignment = None

le = LabelEncoder()


def getCleanDataSets():
    hof_data = getHOFPlayers()
    other_data = getNonHOFPlayers()
    active_data = getAllActivePlayers()

    df_hof = pd.DataFrame(hof_data)
    df_hof['Target'] = 'NA'
    df_non_hof = pd.DataFrame(other_data)
    df_active = pd.DataFrame(active_data)

    hof_columns = list(df_hof.columns)
    other_columns = list(df_non_hof.columns)
    active_columns = list(df_active.columns)

    df_hof[hof_columns] = df_hof[hof_columns].replace({'NA': np.nan})
    df_non_hof[other_columns] = df_non_hof[other_columns].replace({
                                                                  'NA': np.nan})
    df_active[active_columns] = df_active[active_columns].replace({
                                                                  'NA': np.nan})
    return df_hof.fillna(0), df_non_hof.fillna(0), df_active.fillna(0)


def getDataWithOutputs(df):
    # Rating = ((Win Shares / # of Games) * Player Efficiency Rating)) + sum(Awards)

    # Rating > 40.0 ----> Once in a Generation
    # 20.0 <= Rating < 40.0 ----> All Time Great
    # 10.0 <= Rating < 20.0 ----> All Star
    # 3.0 <= Rating < 10.0 ----> Quality Starter
    # 0 <= Rating < 3.0 ----> Role Player
    # Rating < 0 ----> Bench Player


    targets = []
    awards = ['MVP', 'All-NBA', 'NBA Champ', 'All Star', 'All-Defensive',
              'Scoring Champ', 'BLK Champ', 'AST Champ', 'TRB Champ', 'STL Champ']
    for index, row in df.iterrows():
        award_count = np.sum([float(row[i]) for i in awards])
        rating = float(((row['WS'] / row['G']) * row['PER']) + award_count)
        if rating >= 40.0:
            targets.append('Once in a Generation')
        elif rating >= 20.0 and rating < 40.0:
            targets.append('All Time Great')
        elif rating >= 10.0 and rating < 20.0:
            targets.append('All Star')
        elif rating >= 3.0 and rating < 10.0:
            targets.append('Quality Starter')
        elif rating >= 0 and rating <= 3.0:
            targets.append('Role Player')
        elif rating < 0:
            targets.append('Bench Player')
    df['Target'] = np.array(targets)
    return df


def getDataframe():
    df_hof = getDataWithOutputs(getCleanDataSets()[0])
    df_non_hof = getDataWithOutputs(getCleanDataSets()[1])
    df = pd.concat([df_non_hof, df_hof])
    return df.fillna(0)


def getInputOutput(df):
    all_df = getDataframe()
    remove_columns = ['isActive', 'Target', 'Name', 'Position', 'Year Ended']
    # 'ABA Champ', 'All-ABA', 'ABA All-Time', 'All-BAA', 'All-BAA/NBA', 'BAA/NBA Champ']
    columns = list(all_df.columns)
    for column in remove_columns:
        columns.remove(column)

    df_columns = set(df.columns)

    for column in columns:
        if column not in df_columns:
            df[column] = 0.0

    targets = df['Target']
    values = df[columns].values
    return values, targets


def makeModel():
    values = getInputOutput(getDataframe())[0]
    targets = getInputOutput(getDataframe())[1]

    X, y = values, targets
    X = X.astype('float32')
    y = le.fit_transform(y)

    # split into train and test datasets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)

    # determine the number of input features
    n_features = X_train.shape[1]

    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.Dense(10, activation='relu',
                                    kernel_initializer='he_normal', input_shape=(n_features,)))
    model.add(tf.keras.layers.Dense(
        8, activation='relu', kernel_initializer='he_normal'))
    model.add(tf.keras.layers.Dense(8, activation='softmax'))

    # compile the model
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    # fit the model
    model.fit(X_train, y_train, epochs=150, batch_size=32, verbose=0)

    # evaluate the model
    loss, acc = model.evaluate(X_test, y_test, verbose=0)
    print('Test Accuracy: %.3f' % acc)

    model.save('model.h5')


def getPredictions():
    model = tf.keras.models.load_model('model.h5')
    df = getCleanDataSets()[2].fillna(0)
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
    print('####### Quality Starter #######')
    print(df[df['Target'] == 'Quality Starter']['Name'])
    print('####### Role Player #######')
    print(df[df['Target'] == 'Role Player']['Name'])
    print('####### Bench Player #######')
    print(df[df['Target'] == 'Bench Player']['Name'])

    current_df = getDataframe()
    df = pd.concat([df, current_df])
    df.to_csv(r'current.csv', index=False)

makeModel()
getPredictions()
