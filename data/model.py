from sklearn.utils import resample, class_weight
from collections import Counter
from mongo import getAllNonCurrentPlayers, getAllPlayers
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
pd.options.mode.chained_assignment = None


def getCleanDataSets():
    past_data = getAllNonCurrentPlayers()
    all_data = getAllPlayers()

    df = pd.DataFrame(past_data)
    df['Target'] = 'NA'
    df_all = pd.DataFrame(all_data)

    df_columns = list(df.columns)
    all_columns = list(df_all.columns)

    df[df_columns] = df[df_columns].replace({'NA': np.nan})
    df_all[all_columns] = df_all[all_columns].replace({
                                                                  'NA': np.nan})

    return df[:750].fillna(0), df_all.fillna(0)


def getDataWithOutputs(df):
    # Rating = ((Win Shares / # of Games) * Player Efficiency Rating)) + sum(Awards)
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
        elif rating >=5.0 and rating < 10.0:
            targets.append('Quality Starter')
        elif rating >= 0.5 and rating < 5:
            targets.append('Average Player')
        elif rating < 0.5:
            targets.append('Bench Player')
    df['Target'] = np.array(targets)
    return df


def getDataframe():
    df = getDataWithOutputs(getCleanDataSets()[0])
    minority_category = ['Once in a Generation',
        'All Time Great', 'All Star', 'Bench Player', 'Quality Starter']
    print(df.Target.value_counts())
    df_majority = df[df['Target'] == 'Average Player'][:360]
    lst = []
    for i in minority_category:
        df_minority = df[df['Target'] == i]
        df_minority_upsampled = resample(
            df_minority, replace=True, n_samples=360, random_state=123)
        lst.append(df_minority_upsampled)
    lst.append(df_majority)

    # df_minority = df[df['Target'] != 'Bench Player']

    df_upsampled = pd.concat(lst)
    # print(df_upsampled.Target.value_counts())
    return df_upsampled


def getInputOutput(df):
    columns = list(df.columns)
    columns.remove('Name')
    columns.remove('Target')
    columns.remove('G')
    targets = df['Target']
    values = df[columns].values
    return values, targets


def makeModel():
    values = getInputOutput(getDataframe())[0]
    targets = getInputOutput(getDataframe())[1]
    le = LabelEncoder()

    X, y = values, targets
    X = X.astype('float32')
    y = le.fit_transform(y)

    # split into train and test datasets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    n_features = X_train.shape[1]

    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.Flatten(input_shape=(n_features,)))

    model.add(tf.keras.layers.Dense(units=32, activation='relu'))
    model.add(tf.keras.layers.Dense(units=6, activation='softmax'))
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
    print('####### Quality Starter #######')
    print(df[df['Target'] == 'Quality Starter']['Name'])
    print('####### Bench Player #######')
    print(df[df['Target'] == 'Bench Player']['Name'])

    return df


